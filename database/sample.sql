CREATE DATABASE sample;
Use sample;
CREATE TABLE `Users` (
  `first_value` int(11) DEFAULT NULL,
  `second_value` int(11) DEFAULT NULL,
  `result` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
);