import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import cakesRoutes from './routes/cakesRoutes.js';
import clientsRoutes from './routes/clientsRoutes.js';

const server = express();

server.use([express.json(), cors(), cakesRoutes, clientsRoutes]);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(chalk.cyan('Servidor rodando na porta ' + PORT));
});
