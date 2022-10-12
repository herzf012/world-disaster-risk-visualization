-- Don't drop unless you're sure!
DROP TABLE world_risk_index;

CREATE TABLE world_risk_index (
 	id SERIAL NOT NULL PRIMARY KEY,
    country_name text,
	iso_code text,
	year int,
    wri float,
	exposure float,
    vulnerability float,
    susceptibility float,
    coping_inability float,
	adaptive_inability float,
	wri_category text,
	exposure_category text,
	vulnerability_category text,
	susceptibilty_category text
);

SELECT * FROM world_risk_index;