import {foreignKey, integer, json, pgTable, serial, text, varchar} from 'drizzle-orm/pg-core';

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", {length: 255}).notNull(),
  email: varchar('email', {length: 255}).notNull(),
  password: text("password").notNull(),
  uuid: varchar("uuid", {length: 255}).notNull(),
})

export const tables = pgTable("tables", {
  id: serial("id").primaryKey(),
  access: varchar("access"),
  data: json("data").notNull(),
  owner: varchar("owner").notNull(),
  tableName: varchar("tableName", { length: 255}).notNull(),
  filters: json("filters"),
})

export const cellTypes = pgTable("cellTypes", {
  id: serial("id").primaryKey(),
  tableID: integer("tableID")
    .notNull()
    .references(() => tables.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  types: json("types").notNull()
})