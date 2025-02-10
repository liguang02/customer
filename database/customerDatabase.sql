-- Item 4: Create customer table
CREATE DATABASE IF NOT EXISTS customerDatabase;
USE customerDatabase;

CREATE TABLE IF NOT EXISTS customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icNumber VARCHAR(20) UNIQUE NOT NULL,
    dateOfBirth DATE NOT NULL,
    address TEXT NOT NULL,
    addressCountry VARCHAR(100) NOT NULL,
    addressPostcode VARCHAR(10) NOT NULL
);

-- Item 5: Create a Stored Procedure to select all customer records
DELIMITER //
CREATE PROCEDURE GetAllCustomers()
BEGIN
    SELECT * FROM customer;
END //
DELIMITER ;

-- Item 6: Create an index on icNumber
CREATE INDEX idx_icNumber ON customer(icNumber);

-- Explanation:
-- The icNumber column is indexed because it is a unique identifier for each customer.
-- Indexing this column improves the performance of queries that filter customers by IC number, 
-- such as search operations or lookups.

-- Item 7: Insert 30 sample customer records
INSERT INTO customer (name, icNumber, dateOfBirth, address, addressCountry, addressPostcode) VALUES
('Alice Tan', '900101-01-1234', '1990-01-01', '123 Jalan ABC, Kuala Lumpur', 'Malaysia', '50000'),
('Bob Lim', '850202-02-2345', '1985-02-02', '456 Jalan DEF, Selangor', 'Malaysia', '60000'),
('Charlie Wong', '920303-03-3456', '1992-03-03', '789 Jalan GHI, Penang', 'Malaysia', '10000'),
('David Lee', '870404-04-4567', '1987-04-04', '321 Jalan JKL, Johor', 'Malaysia', '81000'),
('Eve Tan', '910505-05-5678', '1991-05-05', '654 Jalan MNO, Sabah', 'Malaysia', '88000'),
('Francis Ng', '880606-06-6789', '1988-06-06', '987 Jalan PQR, Sarawak', 'Malaysia', '93000'),
('Grace Teo', '930707-07-7890', '1993-07-07', '147 Jalan STU, Kedah', 'Malaysia', '05000'),
('Henry Goh', '890808-08-8901', '1989-08-08', '258 Jalan VWX, Perak', 'Malaysia', '30000'),
('Irene Yap', '940909-09-9012', '1994-09-09', '369 Jalan YZA, Melaka', 'Malaysia', '75000'),
('Jack Chua', '950101-10-0123', '1995-01-10', '1234 Jalan BCD, Pahang', 'Malaysia', '25000'),
('Karen Sim', '960202-11-1234', '1996-02-11', '5678 Jalan EFG, Negeri Sembilan', 'Malaysia', '70000'),
('Leo Tan', '970303-12-2345', '1997-03-12', '9101 Jalan HIJ, Terengganu', 'Malaysia', '20000'),
('Michelle Loh', '980404-13-3456', '1998-04-13', '2345 Jalan KLM, Kelantan', 'Malaysia', '15000'),
('Nathan Chan', '990505-14-4567', '1999-05-14', '6789 Jalan NOP, Perlis', 'Malaysia', '01000'),
('Olivia Lim', '000606-15-5678', '2000-06-15', '8901 Jalan QRS, Putrajaya', 'Malaysia', '62000'),
('Peter Tan', '010707-16-6789', '2001-07-16', '3456 Jalan TUV, Labuan', 'Malaysia', '87000'),
('Quincy Ho', '020808-17-7890', '2002-08-17', '7890 Jalan WXY, Selangor', 'Malaysia', '68000'),
('Rachel Ng', '030909-18-8901', '2003-09-18', '4567 Jalan ZAB, Sabah', 'Malaysia', '88100'),
('Samuel Goh', '040101-19-9012', '2004-10-19', '5678 Jalan CDE, Sarawak', 'Malaysia', '93200'),
('Tina Teo', '050202-20-0123', '2005-11-20', '6789 Jalan FGH, Johor', 'Malaysia', '81200'),
('Ulysses Sim', '060303-21-1234', '2006-12-21', '7890 Jalan IJK, Penang', 'Malaysia', '10150'),
('Vera Chua', '070404-22-2345', '2007-01-22', '8901 Jalan LMN, Kedah', 'Malaysia', '05100'),
('William Loh', '080505-23-3456', '2008-02-23', '9012 Jalan OPQ, Perak', 'Malaysia', '30100'),
('Xander Chan', '090606-24-4567', '2009-03-24', '1234 Jalan RST, Melaka', 'Malaysia', '75100'),
('Yasmine Lim', '100707-25-5678', '2010-04-25', '5678 Jalan UVW, Negeri Sembilan', 'Malaysia', '70200'),
('Zachary Tan', '110808-26-6789', '2011-05-26', '6789 Jalan XYZ, Terengganu', 'Malaysia', '20300'),
('Amy Wong', '120909-27-7890', '2012-06-27', '7890 Jalan ABC, Kelantan', 'Malaysia', '15200'),
('Brian Lee', '130101-28-8901', '2013-07-28', '8901 Jalan DEF, Pahang', 'Malaysia', '25200'),
('Catherine Ho', '140202-29-9012', '2014-08-29', '9012 Jalan GHI, Putrajaya', 'Malaysia', '62200');
