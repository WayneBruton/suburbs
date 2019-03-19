create database suburbs;
use suburbs;


CREATE TABLE packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    number_of_suburbs INT NOT NULL,
    option_name VARCHAR(18) NOT NULL,
    option_description VARCHAR(150) NOT NULL,
    per_month DECIMAL(6,2) NOT NULL DEFAULT 0,
    per_year DECIMAL(6,2) NOT NULL DEFAULT 0,
    once_off DECIMAL(6,2) NOT NULL DEFAULT 0
);

INSERT INTO packages (number_of_suburbs,option_name, option_description, per_month, per_year,once_off) values 
(1,'Option 1', 'Website listing One Facebook self-service business advert per week (Mondays only)', 90, 900, 140),
(1,'Option 2', 'Website listing Two Facebook self-service business adverts per week (Mondays & Thursdays only)', 120, 1200, 170),
(2,'Option 3', 'Website listing One Facebook self-service business advert per week (Mondays only)', 180, 1800, 230),
(2,'Option 4', 'Website listing Two Facebook self-service business adverts per week (Mondays & Thursdays only)', 240, 2400, 290),
(3,'Option 5', 'Website listing One Facebook self-service business advert per week (Mondays only)', 270, 270, 320),
(3,'Option 6', 'Website listing Two Facebook self-service business adverts per week (Mondays & Thursdays only)', 360, 3600, 410),
(4,'Option 7 (10%)', 'Website listing One Facebook self-service business advert per week (Mondays only)', 324, 3240, 374),
(4,'Option 8 (10%)', 'Website listing Two Facebook self-service business adverts per week (Mondays & Thursdays only)', 432, 4320, 482),
(5,'Option 9 (15%)', 'Website listing One Facebook self-service business advert per week (Mondays only)', 382, 3820, 432),
(5,'Option 10 (15%)', 'Website listing Two Facebook self-service business adverts per week (Mondays & Thursdays only)', 510, 5100, 560),
(6,'Option 11 (20%)' , 'Website listing One Facebook self-service business advert per week (Mondays only)', 432, 4320, 482),
(6,'Option 12 (20%)', 'Website listing Two Facebook self-service business adverts per week (Mondays & Thursdays only)', 576, 5760, 626),
(7,'Option 13 (25%)', 'Website listing One Facebook self-service business advert per week (Mondays only)', 472, 4720, 522),
(7,'Option 14 (25%)', 'Website listing Two Facebook self-service business adverts per week (Mondays & Thursdays only)', 672, 6720, 722);


CREATE TABLE areas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    area_description VARCHAR(255) NOT NULL UNIQUE,
    isActive boolean NOT NULL DEFAULT true
);

INSERT INTO areas (area_description, isActive) values 
('Atlantic Seaboard', true),
('Cape Flats', false),
('City Bowl', true),
('Helderberg', true),
('Northern Suburbs', true),
('South Peninsula', true),
('Southern Suburbs', true),
('West Coast', true);

select * from areas;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_description VARCHAR(255) NOT NULL UNIQUE,
    isActive boolean NOT NULL DEFAULT true
);

INSERT INTO categories (category_description, isActive) values 
('Accomodation', true),
('Automative', true),
('Adult', true),
('Arts & Crafts', true),
('Events', true),
('Financial', true),
('Garden', true),
('House & Home', true),
('IT & Technology', true),
('Kids', true),
('Legal', true),
('Medical', true),
('Pets', true),
('Pregnancy(Babies)', true),
('Property', true),
('Travel & Tourism', true),
('Transport', true),
('Wellness & Beauty', true);

select * from categories;


   CREATE TABLE client_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    businessName VARCHAR(60) NOT NULL UNIQUE,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    mob_no VARCHAR(13) NOT NULL,
    email VARCHAR(30) NOT NULL,
    website VARCHAR(60) NOT NULL DEFAULT 'No info Provided',
    facebook VARCHAR(60) NOT NULL DEFAULT 'No info Provided',
    instagram VARCHAR(60) NOT NULL DEFAULT 'No info Provided',
    linkedin VARCHAR(60) NOT NULL DEFAULT 'No info Provided',
    feedback VARCHAR(60) NOT NULL DEFAULT 'No info Provided',
    areas JSON NOT NULL,
    selectedOption int NOT NULL,
    catarea JSON NOT NULL,
    product_service varchar(25) not null,
    adminAssist boolean not null,
    profile_heading varchar(25) not null,
    profile_description text not null,
    profile_image VARCHAR(60),
    business_image1 VARCHAR(60),
    business_image2 VARCHAR(60),
    business_image3 VARCHAR(60),
    created_at timestamp default now(),
    terms VARCHAR(30) NOT NULL DEFAULT 'Monthly',
    profile_approved boolean default false,
    paid_to_date boolean default false,
    payment_expires timestamp default now()
    );



    desc client_profiles;


create table users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- username VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    Upassword VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    resettoken varchar(20),
    resetexpiry TIMESTAMP DEFAULT NOW()
);

insert into users (email, Upassword) values ('waynebruton@icloud.com', 'password');

-- CREATE TABLE region (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     region_description VARCHAR(45) NOT NULL UNIQUE
-- );

-- CREATE TABLE category (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     category_description VARCHAR(60) NOT NULL UNIQUE
-- );


-- CREATE TABLE clients (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     first_name varchar(100) NOT NULL,
--     last_name VARCHAR(100) NOT NULL,
--     business_name VARCHAR(100) NOT NULL, 
--     email VARCHAR(150)  NOT NULL DEFAULT 'No Email',
--     contact_number varchar(12) NOT NULL DEFAULT '1234567890',
--     address1 VARCHAR(255) NOT NULL DEFAULT 'No address given',
--     approved BOOLEAN NOT NULL DEFAULT false,
--     active BOOLEAN NOT NULL DEFAULT false,
--     expiry_date TIMESTAMP DEFAULT NOW(),
--     profile_pic varchar(100),
--     main_pic varchar(100),
--     description varchar(600)
-- )


-- CREATE TABLE client_type (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     client_type_description VARCHAR(255) NOT NULL DEFAULT 'Single',
--     client_rate DECIMAL(8,2) NOT NULL DEFAULT 0.0,
--     rate_per_hour_day_month VARCHAR(100) NOT NULL DEFAULT 'Hourly',
--     created_at TIMESTAMP DEFAULT NOW()
-- );

-- INSERT INTO client_type (client_type_description, client_rate, rate_per_hour_day_month) values
-- ('Single', 35.88, 'Hourly'),
-- ('CCP-12', 513.85, 'Daily' ),
-- ('CCP-24', 742.64, 'Daily'),
-- ('AIB', 42.82, 'Hourly'),
-- ('Package', 27667.48, 'Monthly');

