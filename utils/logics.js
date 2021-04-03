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
	isDuplicated,
	isSuspended
}) => {
	const where = { [key]: value };
	if (pKey) where[pKey] = { id: pValue };
	if (id) where.NOT = { id };
	const data = await prisma[tableRef].findFirst({ where });
	if (isDuplicated && data) throw new ApolloError(`${title} is already created...`);
	else {
		if (!data) throw new ApolloError(`${title} not found...`);
		if (isSuspended && data.isSuspended) throw new ApolloError(`${title} is already deleted...`);
	}
	return data;
};
