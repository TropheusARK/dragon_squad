CREATE DATABASE dragon_squad;
USE dragon_squad;
CREATE TABLE users 
(
id INT PRIMARY KEY AUTO_INCREMENT, 
lookupName VARCHAR(20) UNIQUE,
displayName VARCHAR(20),
passwordHash VARCHAR(255)
);
SHOW TABLES;

INSERT INTO users (lookupName, displayName, passwordHash) VALUES ("koka", "Koka", "abc123");

SELECT * FROM users;

