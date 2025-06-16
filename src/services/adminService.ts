import { Admin } from "@prisma/client";

import { db } from "../db/db";

interface AdminBody {
  name: string
  email: string
  password: string
}