CREATE OR REPLACE VIEW public.staff_info
 AS
SELECT first_name, 
	last_name, 
	email, 
	address, 
	district, 
	city, 
	postal_code, 
	phone 
FROM staff
INNER JOIN address USING (address_id) 
INNER JOIN city USING (city_id)