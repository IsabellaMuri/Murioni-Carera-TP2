import {  } from "@prisma/client";
//completar

import { db } from "../db/db";

interface CreateMenuBody {
  name: string
  descrition: string
  price: number //a chequear
  category: string
}