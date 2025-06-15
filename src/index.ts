import "dotenv/config"

import express from 'express';

import { tableRouter } from './routers/tableRouter';
import { orderRouter } from "./routers/orderRouter";
const app = express()

app.use(express.json())

app.use('/tables', tableRouter)
app.use('/orders', orderRouter)

app.listen(8000, () => {
  console.log(`App listening on http://localhost:8000`)
})