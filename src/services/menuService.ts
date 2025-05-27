import {  } from "@prisma/client";
//completar

import { db } from "../db/db";

interface MenuBody {
  name: string
  descrition: string
  price: number //a chequear
  category: string
}