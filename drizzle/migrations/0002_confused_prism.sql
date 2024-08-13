CREATE TABLE IF NOT EXISTS "cellTypes" (
	"id" serial PRIMARY KEY NOT NULL,
	"tableID" integer NOT NULL,
	"types" json NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cellTypes" ADD CONSTRAINT "cellTypes_tableID_tables_id_fk" FOREIGN KEY ("tableID") REFERENCES "public"."tables"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
