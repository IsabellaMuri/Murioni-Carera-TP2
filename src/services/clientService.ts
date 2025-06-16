import { Client } from "@prisma/client";

import { db } from "../db/db";

interface ClientBody {
  name: string
  email: string
  phone: number
  password: string
  adress: string
}