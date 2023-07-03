DROP TABLE if exists products;

CREATE TABLE `products`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `ingredients` LONGTEXT NOT NULL,
    `description` LONGTEXT NOT NULL,
    `quantity` INT UNSIGNED NOT NULL,
    `price` FLOAT UNSIGNED NOT NULL, 
    `size` INT UNSIGNED NOT NULL,
    `image` VARCHAR(999) NOT NULL,PRIMARY KEY(`id`)
);

INSERT INTO products (name, ingredients, description, quantity, price, size, image) VALUES ('Berrylicious Jam', 'Mixed berries, sugar, lemon juice', 'A delightful blend of fresh berries with a tangy twist of lemon', 50, 6.99, 250, 'https://www.chilipeppermadness.com/wp-content/uploads/2018/03/96bf577e2682bc7925dad067c2022909.jpg');
    INSERT INTO products (name, ingredients, description, quantity, price, size, image) VALUES ('Peach Paradise Jam', 'Ripe peaches, sugar, vanilla extract', 'Taste the sweet essence of summer with this heavenly peach jam', 30, 7.99, 200, 'https://www.chilipeppermadness.com/wp-content/uploads/2018/03/96bf577e2682bc7925dad067c2022909.jpg');
    INSERT INTO products (name, ingredients, description, quantity, price, size, image) VALUES ('Tropical Tango Jam', 'Pineapple, mango, papaya, sugar', 'Transport yourself to a tropical island with this exotic fruit jam', 40, 8.99, 300, 'https://www.chilipeppermadness.com/wp-content/uploads/2018/03/96bf577e2682bc7925dad067c2022909.jpg');
    INSERT INTO products (name, ingredients, description, quantity, price, size, image) VALUES ('Citrus Burst Jam', 'Oranges, lemons, sugar', 'Experience a burst of citrus flavor in every spoonful of this zesty jam', 60, 5.99, 200, 'https://www.chilipeppermadness.com/wp-content/uploads/2018/03/96bf577e2682bc7925dad067c2022909.jpg');
    INSERT INTO products (name, ingredients, description, quantity, price, size, image) VALUES ('Cherrylicious Jam', 'Fresh cherries, sugar, almond extract', 'Indulge in the sweet and tart taste of cherries with a hint of almond', 25, 9.99, 150, 'https://www.chilipeppermadness.com/wp-content/uploads/2018/03/96bf577e2682bc7925dad067c2022909.jpg');
    INSERT INTO products (name, ingredients, description, quantity, price, size, image) VALUES ('Mellow Mango Jam', 'Ripe mangoes, sugar, lime juice', 'Savor the tropical flavor of luscious mangoes in this smooth and mellow jam', 35, 6.99, 250, 'https://www.chilipeppermadness.com/wp-content/uploads/2018/03/96bf577e2682bc7925dad067c2022909.jpg');
    INSERT INTO products (name, ingredients, description, quantity, price, size, image) VALUES ('Raspberry Rhapsody Jam', 'Raspberries, sugar, lemon zest', 'Embark on a delightful journey with the intense flavors of raspberries and lemon', 20, 7.99, 200, 'https://www.chilipeppermadness.com/wp-content/uploads/2018/03/96bf577e2682bc7925dad067c2022909.jpg');
    INSERT INTO products (name, ingredients, description, quantity, price, size, image) VALUES ('Apricot Delight Jam', 'Fresh apricots, sugar, vanilla bean', 'Delight your taste buds with the natural sweetness of apricots enhanced with vanilla', 45, 8.99, 300, 'https://www.chilipeppermadness.com/wp-content/uploads/2018/03/96bf577e2682bc7925dad067c2022909.jpg');
    INSERT INTO products (name, ingredients, description, quantity, price, size, image) VALUES ('Blueberry Bliss Jam', 'Juicy blueberries, sugar, cinnamon', 'Experience pure bliss with the burst of juicy blueberries and a hint of cinnamon', 55, 5.99, 200, 'https://www.chilipeppermadness.com/wp-content/uploads/2018/03/96bf577e2682bc7925dad067c2022909.jpg');
    INSERT INTO products (name, ingredients, description, quantity, price, size, image) VALUES ('Strawberry Symphony Jam', 'Fresh strawberries, sugar, balsamic vinegar', 'Let your taste buds dance to the symphony of flavors in this strawberry jam', 40, 9.99, 150, 'https://www.chilipeppermadness.com/wp-content/uploads/2018/03/96bf577e2682bc7925dad067c2022909.jpg');







