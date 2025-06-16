import "dotenv/config"

import express from 'express';

import { tableRouter } from './routers/tableRouter';
import { orderRouter } from "./routers/orderRouter";
import { plateRouter } from "./routers/plateRouter";
import { reservationRouter } from "./routers/reservationRouter";
const app = express()

app.use(express.json())

app.use('/tables', tableRouter)
app.use('/orders', orderRouter)
app.use('/plates', plateRouter)
app.use('/reservations', reservationRouter)

app.listen(8000, () => {
  console.log(`App listening on http://localhost:8000`)
})