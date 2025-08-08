import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandlers';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/v1', router);

// Test route
const test = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', test);

// Global error handler
app.use(globalErrorHandler);

// Not found handler
app.use(notFound);

export default app;
