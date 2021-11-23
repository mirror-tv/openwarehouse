ALTER TABLE public."Contact" ADD "sortOrder" int4 NULL;

ALTER TABLE public."Contact" ADD CONSTRAINT contact_sortorder_unique UNIQUE ("sortOrder");

ALTER TABLE public."Sponsor" ADD url text NULL;
