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

CREATE TABLE currencies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL UNIQUE, 
  gold INT NOT NULL DEFAULT 5000, 
  gems INT NOT NULL DEFAULT 50, 
  energy INT NOT NULL DEFAULT 40, 
  friendshipPoints INT NOT NULL DEFAULT 0, 
FOREIGN KEY (userId) REFERENCES users(id) 
);

DESCRIBE currencies;

INSERT INTO currencies (userId) VALUES (1);

SELECT (userId) FROM player_dragons;

SELECT * FROM currencies;

SHOW TABLES;

TRUNCATE TABLE player_dragons;
TRUNCATE TABLE player_runes;
TRUNCATE TABLE player_pets;
TRUNCATE TABLE currencies;
TRUNCATE TABLE team;
TRUNCATE TABLE users;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE player_dragons (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  dragonId INT NOT NULL,
  level INT NOT NULL DEFAULT 1,
  exp INT NOT NULL DEFAULT 0,
  boost INT NOT NULL DEFAULT 0,
  firstRuneId INT NULL,
  secondRuneId INT NULL,
  petId INT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);

SELECT * FROM player_dragons;

CREATE TABLE player_runes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  runeId INT NOT NULL,
  level INT NOT NULL DEFAULT 0,
  FOREIGN KEY (userId) REFERENCES users(id)
);


CREATE TABLE player_pets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  petId INT NOT NULL,
  passiveId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE team (
	userId INT UNIQUE,
    slot1Id INT,
    slot2Id INT,
    slot3Id INT,
    slot4Id INT,
    FOREIGN KEY (userId) REFERENCES users(id)
);

SELECT * FROM users;

