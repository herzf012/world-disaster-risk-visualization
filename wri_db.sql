CREATE TABLE "world_risk_index" (
	"id" int NOT NULL PRIMARY KEY,
    "region" text NOT NULL,
    "wri" float NOT NULL,
	"exposure" float NOT NULL,
    "vulnerability" float NOT NULL,
    "susceptibility" float NOT NULL,
    "lack_of_coping_capabilities" float NOT NULL,
	"lack_of_adaptive_capacities" float NOT NULL,
	"year" int NOT NULL,
	"exposure_category" text NOT NULL,
	"wri_category" text NOT NULL,
	"vulnerability_category" text NOT NULL,
	"susceptibilty_category" text NOT NULL
);

SELECT * FROM world_risk_index;