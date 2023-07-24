DROP TABLE if exists `favourites`;
DROP TABLE if exists `profiles`;

CREATE TABLE `profiles`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `preferences` TEXT NOT NULL,
    `cooking_skills` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `image` TEXT NOT NULL,
    UNIQUE KEY `profiles_email_unique`(`email`),
    PRIMARY KEY(`id`)
);

CREATE TABLE `favourites`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `profiles_id` INT UNSIGNED NOT NULL ,
    `api_id` INT NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `favourites_profiles_id_foreign` FOREIGN KEY (`profiles_id`) REFERENCES `profiles`(`id`)
);