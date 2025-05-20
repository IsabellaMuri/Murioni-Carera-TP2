import {  } from "@prisma/client";
//completar

import { db } from "../db/db";

interface CreateOrderBody {
  number: number
  client_order: number
  status: string
  plates: string[]
  total_amount: number //a chequear
  discount_percentage: number //a chequear
  deliver_adress: string
}