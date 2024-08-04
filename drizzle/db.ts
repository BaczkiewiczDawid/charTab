import { Pool } from "@neondatabase/serverless"
import { drizzle as drizzleClient } from "drizzle-orm/neon-serverless"

import * as schema from "./schema"

const DatabaseUrl = process.env.DATABASE_URL

export const sql = new Pool({ connectionString: <string>DatabaseUrl })
export const drizzle = drizzleClient(sql, { schema })