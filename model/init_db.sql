DROP TABLE if exists `favourites`;
DROP TABLE if exists `profiles`;

CREATE TABLE `profiles`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `preference` TEXT NOT NULL,
    `cooking_skills` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    UNIQUE KEY `profiles_email_unique`(`email`),
    PRIMARY KEY(`id`)
);

CREATE TABLE `favourites`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `profiles_id` INT UNSIGNED NOT NULL ,
    PRIMARY KEY(`id`),
    CONSTRAINT `favourites_profiles_id_foreign` FOREIGN KEY (`profiles_id`) REFERENCES `profiles`(`id`)
);

INSERT INTO profiles (first_name, last_name, email, password, preference, cooking_skills, description) VALUES ('Stephanie', 'Anko-Hubik', 'sah@sah.com', 'never_use_123', 'vegetarian', 'Novice chef', 'Likes to eat healthily'), ('Saira', 'Akbar', 'sa@sa.com', 'never_use_000', 'kids-friendly', 'Hobby chef', 'The kitchen is the heart of a home'), ('Irene', 'Kulikova', 'ik@ik.com', 'never_use_777', 'soul food', 'Competent chef', 'Likes to experiment with different cuisines'), ('Carli', 'McCarthy', 'cmcc@cmcc.com', 'never_use_111', 'lactose-free', 'Expert chef', 'On the lookout for dairy-free alternative recipes');