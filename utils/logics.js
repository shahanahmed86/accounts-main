import { ApolloError } from 'apollo-server-express';
import { existsSync, mkdirSync, unlinkSync, createWriteStream } from 'fs';
import moment from 'moment';
import path from 'path';
import validate from 'deep-email-validator';

import { prisma } from './';

export const saveFile = (image, old) => {
	return new Promise((resolve, reject) => {
		image.then(({ createReadStream, ...rest }) => {
			const filename = `${Math.random().toString(32).substr(7, 5)}-${rest.filename}`;

			// checking whether the uploads folder is exists
			if (!existsSync('./uploads')) mkdirSync('./uploads');

			// deleting if old file is given
			if (old && existsSync(`./uploads/${old}`)) unlinkSync(`./uploads/${old}`);

			createReadStream()
				.pipe(createWriteStream(path.join('./uploads', filename)))
				.on('error', (error) => reject(new Error(error.message)))
				.on('finish', () => resolve(filename));
		});
	});
};

export const emailValidator = async (email) => {
	if (email.indexOf('@yahoo.com') !== -1) return;

	const { valid, validators, reason } = await validate(email);
	console.log(validators[reason]);
	if (!valid) {
		if (validators[reason].reason.indexOf('The mail transaction has failed')) {
			throw new ApolloError('Invalid email...');
		}
		throw new ApolloError(validators[reason].reason);
	}
};

export const isColorCodeValid = (color) => /[0-9A-Fa-f]{6}/g.test(color);

export const convertDateToISO = (date) => moment.utc(date).toISOString();

export const checkData = async ({
	tableRef,
	key,
	value,
	pKey,
	pValue,
	title,
	id,
	checkDuplication,
	checkSuspension
}) => {
	const where = { [key]: value };
	if (pKey) where[pKey] = { id: pValue };
	if (id) where.NOT = { id };
	const data = await prisma[tableRef].findFirst({ where });

	if (checkDuplication && data) throw new ApolloError(`${title} is already created...`);
	if (!checkDuplication && !data) throw new ApolloError(`${title} not found...`);

	if (checkSuspension && data.isSuspended) throw new ApolloError(`${title} is already deleted...`);

	return data;
};

export const filterRelationData = async ({ req, tableRef, id, ref, isRefSingle = false, checkSuspension = true }) => {
	const { id: userId, userType } = req.user;
	const where = { id };
	if (userType === 'account') {
		if (tableRef !== userType) where[userType] = { id: userId };
		if (checkSuspension) {
			if (isRefSingle) {
				const data = await prisma[tableRef].findFirst({ where })[ref]();
				if (data.isSuspended === false) return data;
				else throw new ApolloError(`${ref} (parent) table is deleted...`);
			} else {
				return prisma[tableRef].findFirst({ where })[ref]({ where: { isSuspended: false } });
			}
		} else {
			return prisma[tableRef].findFirst({ where })[ref]();
		}
	} else {
		return prisma[tableRef].findFirst({ where })[ref]();
	}
};

export const checkDebitOrCreditRows = async (rows, pKey, pValue) => {
	rows.map(({ headId }, i) => {
		if (rows.some((input, j) => input.headId === headId && i !== j)) {
			throw new ApolloError('Account(s) is/are duplicate...');
		}
	});
	await Promise.all(
		rows.map(async ({ headId }) => {
			await checkData({
				tableRef: 'levelFour',
				key: 'id',
				value: headId,
				title: 'Account',
				pKey,
				pValue,
				checkSuspension: true
			});
		})
	);
};

export const maintainLogs = async (id) => {
	const transaction = await prisma.transaction.findUnique({
		where: { id },
		include: {
			credits: true,
			debits: true
		}
	});

	let logs = transaction.logs;
	delete transaction.logs;

	if (logs) {
		let data = JSON.parse(logs);
		if (Array.isArray(data)) data.push(transaction);
		else data = [data, transaction];
		logs = JSON.stringify(data);
	} else {
		logs = JSON.stringify([transaction]);
	}

	await prisma.transaction.update({
		where: { id },
		data: { logs }
	});
};
