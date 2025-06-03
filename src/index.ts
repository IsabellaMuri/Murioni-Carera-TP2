import "dotenv/config"

import express from 'express';

import { tableRouter } from './routers/tableRouter';
const app = express()

app.use(express.json())

app.use('/tables', tableRouter)

app.listen(8000, () => {
  console.log(`App listening on http://localhost:8000`)
})