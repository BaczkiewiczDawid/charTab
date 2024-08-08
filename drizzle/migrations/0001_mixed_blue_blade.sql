CREATE TABLE IF NOT EXISTS "tables" (
	"id" serial PRIMARY KEY NOT NULL,
	"access" varchar,
	"data" json NOT NULL,
	"owner" varchar NOT NULL,
	"tableName" varchar(255) NOT NULL
);
