import "dotenv/config"

import { neonConfig, Pool } from "@neondatabase/serverless"
import { drizzle as drizzleClient } from "drizzle-orm/neon-serverless"
import { migrate } from "drizzle-orm/neon-serverless/migrator"
import ws from "ws"

import * as schema from "./drizzle/schema"

const DatabaseUrl = process.env.DATABASE_URL

neonConfig.webSocketConstructor = ws
export const sql = new Pool({ connectionString: DatabaseUrl })
export const drizzle = drizzleClient(sql, { schema })

await migrate(drizzle, { migrationsFolder: "./drizzle/migrations" })

sql.end()