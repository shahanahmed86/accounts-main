export const {
	JWT_SECRET,
	NODE_ENV,
	APP_PROTOCOL,
	APP_HOST,
	APP_PORT,
	REDIS_HOST,
	REDIS_PASSWORD,
	SESSION_NAME,
	SESSION_SECRET
} = process.env;

export const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT);

export const REDIS_PORT = parseInt(process.env.REDIS_PORT);

export const SESSION_LIFETIME = parseInt(process.env.SESSION_LIFETIME);

export const IN_PROD = NODE_ENV === 'production';
