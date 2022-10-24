import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

const server = express();

server.use([express.json(), cors(), cakesRoutes]);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(chalk.cyan('Servidor rodando na porta ' + PORT));
});
