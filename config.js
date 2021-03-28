export const { JWT_SECRET, NODE_ENV, APP_PROTOCOL, APP_HOST, APP_PORT } = process.env;

export const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT);

export const IN_PROD = NODE_ENV === 'production';
