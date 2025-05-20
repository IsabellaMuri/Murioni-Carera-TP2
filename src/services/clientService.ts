import {  } from "@prisma/client";
//completar

import { db } from "../db/db";

interface CreateClientBody {
  name: string
  email: string
  phone: number
  password: string
  adress: string
}