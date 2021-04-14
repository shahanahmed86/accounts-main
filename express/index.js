import express from 'express';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

// routes
import { fileRoute, userRoute } from './routes';
import {
	REDIS_HOST,
	REDIS_PASSWORD,
	REDIS_PORT,
	SESSION_NAME,
	SESSION_SECRET,
	SESSION_LIFETIME,
	IN_PROD
} from '../config';

const adminStatic = path.resolve(__dirname, 'admin');

// initiate express app;
const app = express();

// parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cors
app.use(cors());

// logs
app.use(morgan('dev'));

// x-powered-by
app.disable('x-powered-by');

// session
const RedisStore = connectRedis(session);
const client = new Redis({ host: REDIS_HOST, port: REDIS_PORT, password: REDIS_PASSWORD });
const store = new RedisStore({ client });
app.use(
	session({
		store,
		name: SESSION_NAME,
		secret: SESSION_SECRET,
		resave: true,
		rolling: true,
		saveUninitialized: false,
		cookie: {
			maxAge: SESSION_LIFETIME,
			sameSite: true,
			secure: IN_PROD
		}
	})
);

// routes
app.use('/file', fileRoute);
app.use('/auth', userRoute);

// builds
app.get('/admin', (req, res) => {
	return res.sendFile(path.resolve(adminStatic, 'index.html'));
});
app.use(express.static(adminStatic));

export default app;
