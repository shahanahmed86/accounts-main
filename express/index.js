import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

// routes
import { fileRoute, userRoute } from './routes';

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

// routes
app.use('/file', fileRoute);
app.use('/auth', userRoute);

// builds
app.get('/admin', (req, res) => {
	return res.sendFile(path.resolve(adminStatic, 'index.html'));
});
app.use(express.static(adminStatic));

export default app;
