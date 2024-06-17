// src/index.ts
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import petRoutes from './routes/petRoutes';
import fs from 'fs';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000; //if is not set port will default to 3000

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

//Allow the old url to still work for backward compatibility
app.get('/pets', (req: Request, res: Response) => {
  res.json(JSON.parse(fs.readFileSync('./data/pets.json', { encoding: 'utf8', flag: 'r' })));
});

//New routing for the api to allow API to easily expanded
app.use('/api', petRoutes);

//Server listening 
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
