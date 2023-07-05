DROP TABLE if exists `profiles`;

CREATE TABLE `profiles`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `favourites` LONGTEXT NOT NULL,
    `preferences` TEXT NOT NULL,
    UNIQUE KEY `profiles_email_unique`(`email`),
    PRIMARY KEY(`id`)
);

INSERT INTO profiles (first_name, last_name, email, password, favourites, preferences) VALUES ('Stephanie', 'Anko-Hubik', 'sah@sah.com', 'never_use_123', 'Zesty Zen Pho, Austrian Sachertorte, Nigerian Stew', 'vegan, vegetarian, kids-friendly'), ('Saira', 'Akbar', 'sa@sa.com', 'never_use_000', 'Zesty Zen Pho, Paella, Sushi', 'flexitarian, kids-friendly'), ('Irene', 'Kulikova', 'ik@ik.com', 'never_use_777', 'Zesty Zen Pho, Sushi, Butter Chicken', 'high-protein, vegetarian, soul food'), ('Carli', 'McCarthy', 'cmcc@cmcc.com', 'never_use_111', 'Irish Stew, Pad Thai, Moussaka', 'high-protein, lactose-free ');