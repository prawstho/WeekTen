-- View: public.customer_info

-- DROP VIEW public.customer_info;

CREATE OR REPLACE VIEW public.customer_info
 AS
 SELECT customer.first_name,
    customer.last_name,
    customer.email,
    address.address,
    address.district,
    city.city,
    country.country,
    address.postal_code,
    address.phone
   FROM customer
     JOIN address USING (address_id)
     JOIN city USING (city_id)
     JOIN country USING (country_id);

ALTER TABLE public.customer_info
    OWNER TO postgres;

