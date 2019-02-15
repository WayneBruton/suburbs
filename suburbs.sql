create database suburbs;
use suburbs;

create table users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    resettoken varchar(20),
    resetexpiry TIMESTAMP DEFAULT NOW()
);

CREATE TABLE region (
    id INT AUTO_INCREMENT PRIMARY KEY,
    region_description VARCHAR(45) NOT NULL UNIQUE
);

CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_description VARCHAR(60) NOT NULL UNIQUE
);


CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name varchar(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    business_name VARCHAR(100) NOT NULL, 
    email VARCHAR(150)  NOT NULL DEFAULT 'No Email',
    contact_number varchar(12) NOT NULL DEFAULT '1234567890',
    address1 VARCHAR(255) NOT NULL DEFAULT 'No address given',
    approved BOOLEAN NOT NULL DEFAULT false,
    active BOOLEAN NOT NULL DEFAULT false,
    expiry_date TIMESTAMP DEFAULT NOW(),
    profile_pic varchar(100),
    main_pic varchar(100),
    description varchar(600)
)


CREATE TABLE client_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_type_description VARCHAR(255) NOT NULL DEFAULT 'Single',
    client_rate DECIMAL(8,2) NOT NULL DEFAULT 0.0,
    rate_per_hour_day_month VARCHAR(100) NOT NULL DEFAULT 'Hourly',
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO client_type (client_type_description, client_rate, rate_per_hour_day_month) values
('Single', 35.88, 'Hourly'),
('CCP-12', 513.85, 'Daily' ),
('CCP-24', 742.64, 'Daily'),
('AIB', 42.82, 'Hourly'),
('Package', 27667.48, 'Monthly');

