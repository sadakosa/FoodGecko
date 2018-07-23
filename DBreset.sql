DROP DATABASE IF EXISTS "foodgecko";
CREATE DATABASE "foodgecko";
\c "foodgecko";

DROP TABLE users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL,
    business_name TEXT NOT NULL,
    pwd_hash TEXT NOT NULL,
    email VARCHAR(55) NOT NULL
);

INSERT INTO users (user_name, business_name, pwd_hash, email)
VALUES ('rochorbc', 'Rochor Beancurd Pte Ltd', 'f6e0a1e2ac41945a9aa7ff8a8aaa0cebc12a3bcc981a929ad5cf810a090e11ae', 'rochor@beancurd.com');

DROP TABLE outlets;
CREATE TABLE outlets (
    user_id INT NOT NULL,
    outlet_id SERIAL PRIMARY KEY,
    outlet_name TEXT NOT NULL,
    outlet_address TEXT NOT NULL,
    table_count INT NOT NULL,
    outlet_tax INT
);

DROP TABLE tables;
CREATE TABLE tables (
    table_id SERIAL PRIMARY KEY,
    outlet_id INT NOT NULL
);

DROP TABLE orders;
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    table_id INT NOT NULL,
);

CREATE TABLE order_items (
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    item_quantity INT NOT NULL

)

DROP TABLE items;
CREATE TABLE items (
    user_id INT NOT NULL,
    item_id SERIAL PRIMARY KEY,
    item_name TEXT NOT NULL,
    item_description TEXT NOT NULL,
    item_price DECIMAL(19,2),
    item_imglink VARCHAR NOT NULL
);