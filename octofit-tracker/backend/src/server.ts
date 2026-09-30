import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/api.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use((request, response, next) => {
  const origin = request.get('Origin');
  const localOrigin = origin === 'http://localhost:5173' || origin === 'http://127.0.0.1:5173';
  const codespaceOrigin = codespaceName
    ? origin === `https://${codespaceName}-5173.app.github.dev`
    : origin !== undefined && /^https:\/\/[a-z0-9-]+-5173\.app\.github\.dev$/i.test(origin);

  if (origin && (localOrigin || codespaceOrigin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Vary', 'Origin');
  }

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.use('/api', apiRouter);

await connectDatabase();

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening at ${baseUrl}`);
});