DROP DATABASE IF EXISTS "foodgecko";
CREATE DATABASE "foodgecko";
\c "foodgecko";

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL,
    business_name TEXT NOT NULL,
    pwd_hash TEXT NOT NULL,
    email VARCHAR(55) NOT NULL
);

INSERT INTO users (user_name, business_name, pwd_hash, email)
VALUES ('rochorbc', 'Rochor Beancurd Pte Ltd', 'f6e0a1e2ac41945a9aa7ff8a8aaa0cebc12a3bcc981a929ad5cf810a090e11ae', 'rochor@beancurd.com');