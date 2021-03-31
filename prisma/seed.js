const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function main() {
	return prisma.admin.upsert({
		where: { username: 'admin' },
		update: {},
		create: {
			username: 'admin',
			password: bcrypt.hashSync('123Abc456', 10)
		}
	});
}
main()
	.then((result) => console.log('admin', result))
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
