-- "Member" definition

CREATE TABLE "Member" (
	id serial4 NOT NULL,
	"firebaseId" text NOT NULL,
	email text NULL,
	"nickName" text NULL,
	state text NOT NULL,
	"updatedAt_utc" timestamp NULL,
	"updatedAt_offset" text NULL,
	"createdAt_utc" timestamp NULL,
	"createdAt_offset" text NULL,
	"updatedBy" int4 NULL,
	"createdBy" int4 NULL,
	CONSTRAINT "Member_pkey" PRIMARY KEY (id),
	CONSTRAINT "Member_state_check" CHECK ((state = ANY (ARRAY['active'::text, 'inactive'::text]))),
	CONSTRAINT member_firebaseid_unique UNIQUE ("firebaseId")
);
CREATE INDEX member_createdby_index ON "Member" USING btree ("createdBy");
CREATE INDEX member_updatedby_index ON "Member" USING btree ("updatedBy");


-- "Member" foreign keys

ALTER TABLE "Member" ADD CONSTRAINT member_createdby_foreign FOREIGN KEY ("createdBy") REFERENCES "User"(id);
ALTER TABLE "Member" ADD CONSTRAINT member_updatedby_foreign FOREIGN KEY ("updatedBy") REFERENCES "User"(id);
