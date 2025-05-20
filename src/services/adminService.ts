import {  } from "@prisma/client";
//completar

import { db } from "../db/db";

interface CreateAdminBody {
  name: string
  email: string
  password: string
}