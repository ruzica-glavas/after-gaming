-- Creazione del database
CREATE DATABASE After_Gaming_DB;
USE After_Gaming_DB;


-- Tabella Prodotti (con trailer_url e name esplicito)
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(255) NOT NULL UNIQUE, -- Per URL
    name VARCHAR(255) NOT NULL, -- Nome del gioco (già presente, ma esplicitato)
    description TEXT,
    price DECIMAL(10, 2) NOT NULL, -- Prezzo attuale (scontato se in promozione)
    original_price DECIMAL(10, 2), -- Prezzo originale (per promozioni)
    image_url VARCHAR(255),
    platform VARCHAR(50), -- Es. Steam, PS5
    trailer_url VARCHAR(255), -- URL o ID del trailer di YouTube
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Chiavi Digitali
CREATE TABLE digital_keys (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT, -- Riferimento al prodotto
    `key` VARCHAR(50) NOT NULL UNIQUE, -- Chiave digitale univoca
    is_sold BOOLEAN DEFAULT FALSE, -- Indica se la chiave è stata venduta
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Tabella Ordini
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    total DECIMAL(10, 2) NOT NULL,
    billing_address TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    discount_code_id INT, -- Riferimento al codice sconto
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    FOREIGN KEY (discount_code_id) REFERENCES discount_codes(id)
);

-- Tabella Order_Product (rinominata da order_items)
CREATE TABLE order_product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    digital_key_id INT, -- Riferimento alla chiave digitale assegnata
    quantity INT NOT NULL DEFAULT 1,
    price_at_purchase DECIMAL(10, 2) NOT NULL, -- Prezzo al momento dell'acquisto
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (digital_key_id) REFERENCES digital_keys(id)
);

-- Tabella Codici Sconto
CREATE TABLE discount_codes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    discount_percentage DECIMAL(5, 2) NOT NULL, -- Es. 10.00 per 10%
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);









INSERT INTO products (slug, name, description, price, original_price, image_url, platform, trailer_url) VALUES
('cyberpunk-2077', 'Cyberpunk 2077', 'Un RPG open-world ambientato nella futuristica Night City.', 29.99, 59.99, 'https://meups.com.br/wp-content/uploads/2020/03/CYBERPUNK-2077.jpeg', 'PC', 'https://www.youtube.com/embed/8X2kIfS6fb8?si=3Rvft6uKN5gQRbI_'),
('elden-ring', 'Elden Ring', 'Un action RPG epico creato da FromSoftware.', 39.99, 59.99, 'https://assets.nuuvem.com/image/upload/t_product_sharing_banner/v1/products/618418052f91a002e3f9cf6b/sharing_images/dl3d5ccidn9wlkemhfjr.jpg', 'PS5', 'https://www.youtube.com/embed/AKXiKBnzpBQ?si=JYISB8DV43Xt9-v0'),
('fifa-23', 'FIFA 23', 'Il miglior simulatore di calcio.', 19.99, 49.99, 'https://gaming-cdn.com/images/products/10545/orig/fifa-23-pc-gioco-ea-app-cover.jpg?v=1703155498', 'Xbox', 'https://www.youtube.com/embed/o3V-GvvzjE4?si=TayZPxva6hdkN_LC'),
('call-of-duty-mw2', 'Call of Duty: Modern Warfare II', 'Sparatutto in prima persona.', 49.99, NULL, 'https://www.playstationbit.com/wp-content/uploads/2022/05/Call-of-Duty-Modern-Warfare-II.jpeg', 'PC', 'https://www.youtube.com/embed/ztjfwecrY8E?si=SWsyZWdK3W67YGyG'),
('god-of-war-ragnarok', 'God of War: Ragnarok', 'Avventura epica con Kratos.', 59.99, NULL, 'https://cdn1.epicgames.com/spt-assets/edaff839f0734d16bc89d2ddb1dc9339/steel-magnolia-15owu.jpg', 'PS5', 'https://www.youtube.com/embed/EE-4GvjKcfs?si=g1kX1t14mIHtbQt5'),
('horizon-forbidden-west', 'Horizon Forbidden West', 'Esplora un mondo post-apocalittico.', 39.99, 69.99, 'https://image.api.playstation.com/vulcan/ap/rnd/202107/3100/eBGpy4IBunkdd8fukcshdIQy.jpg', 'PS5', 'https://www.youtube.com/embed/Lq594XmpPBg?si=8tAjgM7Dxb4M_-K5'),
('gta-v', 'Grand Theft Auto V', 'Vivi la vita criminale a Los Santos.', 19.99, 39.99, 'https://gametimers.it/wp-content/uploads/2022/03/grand-theft-auto-v-5-gta5.jpg', 'PC', 'https://www.youtube.com/embed/QkkoHAzjnUs?si=Yhj2kK_C18VsuqvI'),
('red-dead-redemption-2', 'Red Dead Redemption 2', 'Un western open-world.', 29.99, 59.99, 'https://i.blogs.es/169695/red0/1366_2000.jpg', 'Xbox', 'https://www.youtube.com/embed/gmA6MrX81z4?si=DKI44lUjWXaMeJhM'),
('the-witcher-3', 'The Witcher 3: Wild Hunt', 'Caccia mostri in un mondo fantasy.', 14.99, 39.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnIbDBubMA_965PU3z9mWBvsADhNXeCFza9g&s', 'PC', 'https://www.youtube.com/embed/c0i88t0Kacs?si=gE0iGu2_uMsLyR9R'),
('assassins-creed-valhalla', 'Assassin’s Creed Valhalla', 'Vivi l’era vichinga.', 24.99, 59.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD1RzqS2j0Oyf34ZdIuUdG8bRK9A8YGIFZQg&s', 'PS5', 'https://www.youtube.com/embed/rKjUAWlbTJk?si=A3yyopxZmViMyagV'),
('spider-man-miles-morales', 'Spider-Man: Miles Morales', 'Swing through New York.', 29.99, 49.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVfQU3aKw4qmu3s60sVXZ5TgteVpLEah_C3Q&s', 'PS5', 'https://www.youtube.com/embed/3wHL2VIaFcs?si=1bTYALWfR-CNksMR'),
('battlefield-2042', 'Battlefield 2042', 'Guerra su larga scala.', 19.99, 59.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlThTUvZYrmZwkk2jqhKEmKLfN1N5_Fqg0SQ&s', 'PC', 'https://www.youtube.com/embed/ASzOzrB-a9E?si=2170iAuObe8WHsnS'),
('forza-horizon-5', 'Forza Horizon 5', 'Corse open-world in Messico.', 39.99, 59.99, 'https://image.api.playstation.com/vulcan/ap/rnd/202502/1300/01248ef12bf2841c3b97bc1af344f922e5cbbf7a8870e0f8.jpg', 'Xbox', 'https://www.youtube.com/embed/Rv7xLt5yNsM?si=2xUVuI2o898iB755'),
('halo-infinite', 'Halo Infinite', 'Torna Master Chief.', 29.99, 59.99, 'https://www.thegamesmachine.it/wp-content/uploads/2020/07/Halo-Infinite-copertina-01.jpg', 'Xbox', 'https://www.youtube.com/embed/rFh2i4AlPD4?si=hurH3w0fGvFK3_Zb'),
('resident-evil-village', 'Resident Evil Village', 'Survival horror con Ethan Winters.', 24.99, 49.99, 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1196590/capsule_616x353.jpg?t=1741142800', 'PC', 'https://www.youtube.com/embed/CNpIfP4vtrE?si=1lRbCQTAK6_vAKLH'),
('death-stranding', 'Death Stranding', 'Un viaggio in un mondo surreale.', 19.99, 39.99, 'https://hb.imgix.net/4bc63ce61cb8daa252ae06667443f93b52aefc98.jpg?auto=compress,format&fit=crop&h=353&w=616&s=7ed585fd57ca68286f5a72e45588b6d2', 'PS5', 'https://www.youtube.com/embed/Mpn-MC2B6Zc?si=gpFepGrG3SHGMzbY'),
('sekiro-shadows-die-twice', 'Sekiro: Shadows Die Twice', 'Un souls-like in Giappone feudale.', 29.99, 59.99, 'https://gaming-cdn.com/images/products/3520/orig/sekiro-shadows-die-twice-xbox-one-gioco-microsoft-store-cover.jpg?v=1732117146', 'PC', 'https://www.youtube.com/watch?v=rXMX4YJ7Lks'),
('ghost-of-tsushima', 'Ghost of Tsushima', 'Diventa un samurai.', 39.99, 59.99, 'https://cdn-images.dzcdn.net/images/cover/89f6895319c499b3d5f6b995f68110bb/0x1900-000000-80-0-0.jpg', 'PS5', 'https://www.youtube.com/watch?v=iqysmS4lxwQ'),
('minecraft', 'Minecraft', 'Costruisci il tuo mondo.', 19.99, NULL, 'https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/2x1_NSwitch_Minecraft.jpg', 'PC', 'https://www.youtube.com/watch?v=MmB9b5njVbA'),
('among-us', 'Among Us', 'Trova l’impostore.', 4.99, NULL, 'https://www.aranzulla.it/wp-content/contenuti/2021/02/56574664-1-1200x628.jpg', 'PC', 'https://www.youtube.com/watch?v=9pyYq9lpjls');

select * from products;
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE digital_keys;
TRUNCATE TABLE products;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO digital_keys (product_id, `key`, is_sold) VALUES
(1, 'CYBER-1234-ABCD', TRUE), (1, 'CYBER-5678-EFGH', TRUE), (1, 'CYBER-9012-IJKL', FALSE),
(2, 'ELDEN-1234-ABCD', TRUE), (2, 'ELDEN-5678-EFGH', FALSE), (2, 'ELDEN-9012-IJKL', FALSE),
(3, 'FIFA-1234-ABCD', FALSE), (3, 'FIFA-5678-EFGH', FALSE), (3, 'FIFA-9012-IJKL', TRUE),
(4, 'CODMW-1234-ABCD', TRUE), (4, 'CODMW-5678-EFGH', TRUE), (4, 'CODMW-9012-IJKL', FALSE),
(5, 'GOWR-1234-ABCD', FALSE), (5, 'GOWR-5678-EFGH', FALSE), (5, 'GOWR-9012-IJKL', TRUE),
(6, 'HORIZ-1234-ABCD', TRUE), (6, 'HORIZ-5678-EFGH', TRUE), (6, 'HORIZ-9012-IJKL', FALSE),
(7, 'GTAV-1234-ABCD', FALSE), (7, 'GTAV-5678-EFGH', FALSE), (7, 'GTAV-9012-IJKL', FALSE),
(8, 'RDR2-1234-ABCD', TRUE), (8, 'RDR2-5678-EFGH', TRUE), (8, 'RDR2-9012-IJKL', FALSE),
(9, 'WITCH-1234-ABCD', FALSE), (9, 'WITCH-5678-EFGH', TRUE), (9, 'WITCH-9012-IJKL', FALSE),
(10, 'ACVAL-1234-ABCD', TRUE), (10, 'ACVAL-5678-EFGH', TRUE), (10, 'ACVAL-9012-IJKL', FALSE),
(11, 'SPIDE-1234-ABCD', FALSE), (11, 'SPIDE-5678-EFGH', TRUE), (11, 'SPIDE-9012-IJKL', FALSE),
(12, 'BF204-1234-ABCD', TRUE), (12, 'BF204-5678-EFGH', TRUE), (12, 'BF204-9012-IJKL', TRUE),
(13, 'FORZA-1234-ABCD', FALSE), (13, 'FORZA-5678-EFGH', FALSE), (13, 'FORZA-9012-IJKL', FALSE),
(14, 'HALOI-1234-ABCD', TRUE), (14, 'HALOI-5678-EFGH', TRUE), (14, 'HALOI-9012-IJKL', FALSE),
(15, 'REVIL-1234-ABCD', FALSE), (15, 'REVIL-5678-EFGH', FALSE), (15, 'REVIL-9012-IJKL', TRUE),
(16, 'DEATH-1234-ABCD', TRUE), (16, 'DEATH-5678-EFGH', FALSE), (16, 'DEATH-9012-IJKL', FALSE),
(17, 'SEKIR-1234-ABCD', TRUE), (17, 'SEKIR-5678-EFGH', FALSE), (17, 'SEKIR-9012-IJKL', TRUE),
(18, 'GHOST-1234-ABCD', TRUE), (18, 'GHOST-5678-EFGH', TRUE), (18, 'GHOST-9012-IJKL', TRUE),
(19, 'MINEC-1234-ABCD', FALSE), (19, 'MINEC-5678-EFGH', FALSE), (19, 'MINEC-9012-IJKL', FALSE),
(20, 'AMONG-1234-ABCD', TRUE), (20, 'AMONG-5678-EFGH', TRUE), (20, 'AMONG-9012-IJKL', TRUE);


select * from digital_keys;


INSERT INTO discount_codes (code, discount_percentage, start_date, end_date, is_active) VALUES
('GAMER10', 10.00, '2025-01-01', '2025-12-31', TRUE), -- 10% di sconto, attivo
('SPRING20', 20.00, '2025-03-01', '2025-03-31', FALSE), -- 20% di sconto, scaduto
('WELCOME5', 5.00, '2025-01-01', '2025-12-31', TRUE); -- 5% di sconto, attivo

select * from discount_codes;