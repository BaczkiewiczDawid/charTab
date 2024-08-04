import * as process from "process"
import type {Config} from "drizzle-kit"
import {defineConfig} from "drizzle-kit"


export default defineConfig({
  schema: "./drizzle",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: <string>process.env.DATABASE_URL,
  },
}) satisfies Config