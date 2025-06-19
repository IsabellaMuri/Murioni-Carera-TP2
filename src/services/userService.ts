import { User } from "@prisma/client";

import { db } from "../db/db";

interface UserBody {
  name: string
  email: string
  phone: number
  password: string
  adress: string
}

