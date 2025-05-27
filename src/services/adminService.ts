import {  } from "@prisma/client";
//completar

import { db } from "../db/db";

interface AdminBody {
  name: string
  email: string
  password: string
}