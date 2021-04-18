export const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT || 10);

export const {
	JWT_SECRET = 'jwt_secret',

	NODE_ENV = 'development',
	APP_PROTOCOL = 'http:',
	APP_HOST = 'localhost:4000',
	APP_PORT = 4000,

	REDIS_HOST = 'localhost',
	REDIS_PASSWORD = 'secret',

	SESSION_NAME = 'sid',
	SESSION_SECRET = 'ssh!secret!'
} = process.env;

export const REDIS_PORT = parseInt(process.env.REDIS_PORT || 6379);

export const SESSION_LIFETIME = parseInt(process.env.SESSION_LIFETIME || 86400000);

export const IN_PROD = NODE_ENV === 'production';
