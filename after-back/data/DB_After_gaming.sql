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




SHOW DATABASES;



INSERT INTO products (slug, name, description, price, original_price, image_url, platform, trailer_url) VALUES
('cyberpunk-2077', 'Cyberpunk 2077', 'Un RPG open-world ambientato nella futuristica Night City.', 29.99, 59.99, 'https://meups.com.br/wp-content/uploads/2020/03/CYBERPUNK-2077.jpeg', 'PC', 'https://www.youtube.com/embed/8X2kIfS6fb8?si=3Rvft6uKN5gQRbI_'),
('elden-ring', 'Elden Ring', 'Un action RPG epico creato da FromSoftware.', 39.99, 59.99, 'https://assets.nuuvem.com/image/upload/t_product_sharing_banner/v1/products/618418052f91a002e3f9cf6b/sharing_images/dl3d5ccidn9wlkemhfjr.jpg', 'PS5', 'https://www.youtube.com/embed/AKXiKBnzpBQ?si=JYISB8DV43Xt9-v0'),
('fifa-23', 'FIFA 23', 'Il miglior simulatore di calcio.', 19.99, 49.99, 'https://gaming-cdn.com/images/products/10545/orig/fifa-23-pc-gioco-ea-app-cover.jpg?v=1703155498', 'Xbox', 'https://www.youtube.com/embed/o3V-GvvzjE4?si=TayZPxva6hdkN_LC'),
('call-of-duty-mw2', 'Call of Duty: Modern Warfare II', 'Sparatutto in prima persona.', 38.99, 49.99, 'https://www.playstationbit.com/wp-content/uploads/2022/05/Call-of-Duty-Modern-Warfare-II.jpeg', 'PC', 'https://www.youtube.com/embed/ztjfwecrY8E?si=SWsyZWdK3W67YGyG'),
('god-of-war-ragnarok', 'God of War: Ragnarok', 'Avventura epica con Kratos.', 54.99, 59.98, 'https://cdn1.epicgames.com/spt-assets/edaff839f0734d16bc89d2ddb1dc9339/steel-magnolia-15owu.jpg', 'PS5', 'https://www.youtube.com/embed/EE-4GvjKcfs?si=g1kX1t14mIHtbQt5'),
('horizon-forbidden-west', 'Horizon Forbidden West', 'Esplora un mondo post-apocalittico.', 39.99, 69.99, 'https://image.api.playstation.com/vulcan/ap/rnd/202107/3100/eBGpy4IBunkdd8fukcshdIQy.jpg', 'PS5', 'https://www.youtube.com/embed/Lq594XmpPBg?si=8tAjgM7Dxb4M_-K5'),
('gta-v', 'Grand Theft Auto V', 'Vivi la vita criminale a Los Santos.', 19.99, 39.99, 'https://gametimers.it/wp-content/uploads/2022/03/grand-theft-auto-v-5-gta5.jpg', 'PC', 'https://www.youtube.com/embed/QkkoHAzjnUs?si=Yhj2kK_C18VsuqvI'),
('red-dead-redemption-2', 'Red Dead Redemption 2', 'Un western open-world.', 29.99, 59.99, 'https://i.blogs.es/169695/red0/1366_2000.jpg', 'Xbox', 'https://www.youtube.com/embed/gmA6MrX81z4?si=DKI44lUjWXaMeJhM'),
('the-witcher-3', 'The Witcher 3: Wild Hunt', 'Caccia mostri in un mondo fantasy.', 14.99, 39.99, 'https://cdn1.epicgames.com/offer/14ee004dadc142faaaece5a6270fb628/EGS_TheWitcher3WildHuntCompleteEdition_CDPROJEKTRED_S1_2560x1440-82eb5cf8f725e329d3194920c0c0b64f', 'PC', 'https://www.youtube.com/embed/c0i88t0Kacs?si=gE0iGu2_uMsLyR9R'),
('assassins-creed-valhalla', 'Assassin’s Creed Valhalla', 'Vivi l’era vichinga.', 24.99, 59.99, 'https://wallpapers.com/images/hd/4k-assassin-s-creed-valhalla-background-3840-x-2160-w92d2uf6xld3muip.jpg', 'PS5', 'https://www.youtube.com/embed/rKjUAWlbTJk?si=A3yyopxZmViMyagV'),
('spider-man-miles-morales', 'Spider-Man: Miles Morales', 'Swing through New York.', 29.99, 49.99, 'https://image.api.playstation.com/vulcan/ap/rnd/202008/1420/HcLcfeQBXd2RiQaCeWQDCIFN.jpg', 'PS5', 'https://www.youtube.com/embed/3wHL2VIaFcs?si=1bTYALWfR-CNksMR'),
('battlefield-2042', 'Battlefield 2042', 'Guerra su larga scala.', 19.99, 59.99, 'https://images.wallpapersden.com/image/download/battlefield-20424k_bGxrbW2UmZqaraWkpJRma21lrWZlamU.jpg', 'PC', 'https://www.youtube.com/embed/ASzOzrB-a9E?si=2170iAuObe8WHsnS'),
('forza-horizon-5', 'Forza Horizon 5', 'Corse open-world in Messico.', 39.99, 59.99, 'https://image.api.playstation.com/vulcan/ap/rnd/202502/1300/01248ef12bf2841c3b97bc1af344f922e5cbbf7a8870e0f8.jpg', 'Xbox', 'https://www.youtube.com/embed/Rv7xLt5yNsM?si=2xUVuI2o898iB755'),
('halo-infinite', 'Halo Infinite', 'Torna Master Chief.', 29.99, 59.99, 'https://www.thegamesmachine.it/wp-content/uploads/2020/07/Halo-Infinite-copertina-01.jpg', 'Xbox', 'https://www.youtube.com/embed/rFh2i4AlPD4?si=hurH3w0fGvFK3_Zb'),
('resident-evil-village', 'Resident Evil Village', 'Survival horror con Ethan Winters.', 24.99, 49.99, 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1196590/capsule_616x353.jpg?t=1741142800', 'PC', 'https://www.youtube.com/embed/CNpIfP4vtrE?si=1lRbCQTAK6_vAKLH'),
('death-stranding', 'Death Stranding', 'Un viaggio in un mondo surreale.', 19.99, 39.99, 'https://hb.imgix.net/4bc63ce61cb8daa252ae06667443f93b52aefc98.jpg?auto=compress,format&fit=crop&h=353&w=616&s=7ed585fd57ca68286f5a72e45588b6d2', 'PS5', 'https://www.youtube.com/embed/Mpn-MC2B6Zc?si=gpFepGrG3SHGMzbY'),
('sekiro-shadows-die-twice', 'Sekiro: Shadows Die Twice', 'Un souls-like in Giappone feudale.', 29.99, 59.99, 'https://gaming-cdn.com/images/products/3520/orig/sekiro-shadows-die-twice-xbox-one-gioco-microsoft-store-cover.jpg?v=1732117146', 'PC', 'https://www.youtube.com/embed/rXMX4YJ7Lks?si=pfYu36ewY70OfxAw'),
('ghost-of-tsushima', 'Ghost of Tsushima', 'Diventa un samurai.', 39.99, 59.99, 'https://cdn-images.dzcdn.net/images/cover/89f6895319c499b3d5f6b995f68110bb/0x1900-000000-80-0-0.jpg', 'PS5', 'https://www.youtube.com/embed/iqysmS4lxwQ?si=g7ZAq1-9We7nD73N'),
('minecraft', 'Minecraft', 'Costruisci il tuo mondo.', 15.99, 19.99, 'https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/2x1_NSwitch_Minecraft.jpg', 'PC', 'https://www.youtube.com/embed/MmB9b5njVbA?si=EpWkdGhdHw3IIPaG'),
('among-us', 'Among Us', 'Trova l’impostore.', 2.99, 4.99, 'https://www.aranzulla.it/wp-content/contenuti/2021/02/56574664-1-1200x628.jpg', 'PC', 'https://www.youtube.com/embed/CermGp8bwFE?si=wgHGEncVMDUwLAPH'),
('dark-souls-iii', 'Dark Souls III', 'Un souls-like oscuro e impegnativo.', 20.99, 34.99, 'https://images.hdqwalls.com/wallpapers/dark-souls-3-8k-om.jpg', 'PC', 'https://www.youtube.com/embed/_zDZYrIUgKE?si=A_8kxACNY0sO5WkL'),
('final-fantasy-xv', 'Final Fantasy XV', 'Un RPG d\'azione open-world.', 24.99, 49.99, 'https://www.teahub.io/photos/full/257-2571126_ff-xvspoiler-a-wallpaper-for-final-fantasy-xv.jpg', 'PC', 'https://www.youtube.com/embed/CNM6o9um1dc?si=PNXPOcFdEHEYyqNP'),
('devil-may-cry-5', 'Devil May Cry 5', 'Azione hack-and-slash spettacolare.', 29.99, 49.99, 'https://pixelz.cc/wp-content/uploads/2018/07/devil-may-cry-5-logo-uhd-4k-wallpaper.jpg', 'PC', 'https://www.youtube.com/embed/dG6_CAdiLPM?si=6AhyiNupFID8pr-2'),
('resident-evil-4-remake', 'Resident Evil 4 Remake', 'Un survival horror rivisitato.', 39.99, 59.99, 'https://denjinden.com/wp-content/uploads/2023/04/resident-evil-4-remake-keyart.jpeg', 'PS5', 'https://www.youtube.com/embed/Id2EaldBaWw?si=zfQTuz6161nzYE5w'),
('marvels-spider-man-2', 'Marvel\'s Spider-Man 2', 'Avventura web-slinging.', 49.99, 69.99, 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/97e9f5fa6e50c185d249956c6f198a2652a9217e69a59ecd.jpg', 'PS5', 'https://www.youtube.com/embed/9fVYKsEmuRo?si=VAOFdIsqUS5k7sko'),
('assassins-creed-mirage', 'Assassin\'s Creed Mirage', 'Un ritorno alle origini stealth.', 44.99, 49.99, 'https://staticg.sportskeeda.com/editor/2024/05/fa6bb-17166654200162-1920.jpg', 'Xbox', 'https://www.youtube.com/embed/wTRw6mF53Nk?si=dXYP3ibI_hdkZHnL'),
('call-of-duty-black-ops-6', 'Call of Duty: Black Ops 6', 'Nuovo capitolo della saga.', 59.99, 69.99, 'https://staticg.sportskeeda.com/editor/2024/05/fa6bb-17166654200162-1920.jpgg', 'PC', 'https://www.youtube.com/embed/ghi101'),
('mortal-kombat-1', 'Mortal Kombat 1', 'Rilancio della serie di picchiaduro.', 49.99, 69.99, 'https://images.wallpapersden.com/image/download/mortal-kombat-1-remake_bmVqZmmUmZqaraWkpJRmbmdlrWZlbWU.jpg', 'PS5', 'https://www.youtube.com/embed/lBYvt1_t6Q4?si=_YhTU7Bli0jYW7ME'),
('farcry-6', 'Far Cry 6', 'Avventura open-world in un\'isola ribelle.', 39.99, 59.99, 'https://www.heypoorplayer.com/wp-content/uploads/2021/05/far-cry-6.jpeg', 'PC', 'https://www.youtube.com/embed/-IJuKT1mHO8?si=XjTLk9C8JLVK5nge'),
('hitman-3', 'Hitman 3', 'Il capitolo finale della trilogia.', 29.99, 39.99, 'https://www.gamespot.com/a/uploads/screen_kubrick/1574/15746725/3784536-321111.jpg', 'Xbox', 'https://www.youtube.com/embed/Z29ORu6_p34?si=lOza8_iVYd0hCRUC'),
('resident-evil-5', 'Resident Evil 5', 'Survival horror con Chris.', 4.99, 14.99, 'https://cdn-ext.fanatical.com/production/product/1280x720/5dcb7eb8-4550-4621-a95d-c2a1fbf6b9b5.jpeg', 'PC', 'https://www.youtube.com/embed/EUI48f4iWPc?si=-TSG7D4B7jfhSqXL'),
('dead-space-2', 'Dead Space 2', 'Un horro claustrofibico nei panni di Isac Clark.', 14.99, 29.99, 'https://4.bp.blogspot.com/-ME53MJR3Oxk/TqbifH6MfDI/AAAAAAAADqo/eioXsmxVe9k/s1600/Dead_space_2_Logo_HD_Wallpaper_Vvallpaper.Net.jpg', 'PC', 'https://www.youtube.com/embed/EtEEa4PU7ok?si=-v-roxl33KM0oL9b'),
('metro-exodus', 'Metro Exodus', 'Un FPS post-apocalittico.', 19.99, 29.99, 'https://static.polityka.pl/_resource/res/path/15/aa/15aa7307-84dc-4f6d-a6db-5d442eb41b09_f1400x900', 'PC', 'https://www.youtube.com/embed/fbbqlvuovQ0?si=94cEwWJuKYgSuGJ9'),
('sniper-elite-5', 'Sniper Elite 5', 'Stealth e tattiche da cecchino.', 29.99, 49.99, 'https://cdn.wccftech.com/wp-content/uploads/2022/05/Sniper-Elite-5-Header.png', 'Xbox', 'https://www.youtube.com/embed/kcQX1djYtQw?si=p60PN4GPr7g0VUNh'),
('the-crew-motorfest', 'The Crew Motorfest', 'Corsa open-world a tema festival.', 39.99, 59.99, 'https://www.charlieintel.com/cdn-image/wp-content/uploads/2023/09/05/Is-The-Crew-Motorfest-on-Steam.jpeg?width=1200&quality=75&format=auto', 'PS5', 'https://www.youtube.com/embed/2S-A3z866YI?si=7geJHL_0vSi3Gupf'),
('atomic-heart', 'Atomic Heart', 'FPS con ambientazione retrofuturistica.', 34.99, 49.99, 'https://www.well-played.com.au/wp-content/uploads/2022/11/AtomicHeart_KeyArt_StandardEdition_4K-1536x864.jpg', 'PC', 'https://www.youtube.com/embed/bdCqKajLhIM?si=Osix4WGmuKkXl7-G'),
('days-gone', 'Days Gone', 'Un survival open-world post-apocalittico.', 19.99, 39.99, 'https://c4.wallpaperflare.com/wallpaper/820/315/652/days-gone-sony-bend-art-wallpaper-preview.jpg', 'PS5', 'https://www.youtube.com/embed/p9XlSvnRk3E?si=bFEssFOARFjkIYCF'),
('control', 'Control', 'Un action-adventure con poteri soprannaturali.', 29.99, 39.99, 'https://monstervine.com/wp-content/uploads/2019/08/control-banner.jpg', 'Xbox', 'https://www.youtube.com/embed/F74LLDhAhhI?si=pmxyKFMM0R7AcVyw'),
('mafia-definitive-edition', 'Mafia: Definitive Edition', 'Remake del classico gangster.', 19.99, 29.99, 'https://assets.nuuvem.com/image/upload/t_product_sharing_banner/v1/products/5f1f1df6c883e675da3298fb/sharing_images/f1wghhfdm6ggph90xo0w.jpg', 'PC', 'https://www.youtube.com/embed/3a5cqV8PUQs?si=lh5rmt0VER9Oc8ao');



select * from products;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE digital_keys;
TRUNCATE TABLE products;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO digital_keys (product_id, `key`, is_sold) VALUES
(1, 'CYBER-1234-ABCD', FALSE), (1, 'CYBER-5678-EFGH', FALSE), (1, 'CYBER-9012-IJKL', FALSE),
(2, 'ELDEN-1234-ABCD', FALSE), (2, 'ELDEN-5678-EFGH', FALSE), (2, 'ELDEN-9012-IJKL', FALSE),
(3, 'FIFA-1234-ABCD', FALSE), (3, 'FIFA-5678-EFGH', FALSE), (3, 'FIFA-9012-IJKL', FALSE),
(4, 'CODMW-1234-ABCD', FALSE), (4, 'CODMW-5678-EFGH', FALSE), (4, 'CODMW-9012-IJKL', FALSE),
(5, 'GOWR-1234-ABCD', FALSE), (5, 'GOWR-5678-EFGH', FALSE), (5, 'GOWR-9012-IJKL', FALSE),
(6, 'HORIZ-1234-ABCD', FALSE), (6, 'HORIZ-5678-EFGH', FALSE), (6, 'HORIZ-9012-IJKL', FALSE),
(7, 'GTAV-1234-ABCD', FALSE), (7, 'GTAV-5678-EFGH', FALSE), (7, 'GTAV-9012-IJKL', FALSE),
(8, 'RDR2-1234-ABCD', FALSE), (8, 'RDR2-5678-EFGH', FALSE), (8, 'RDR2-9012-IJKL', FALSE),
(9, 'WITCH-1234-ABCD', FALSE), (9, 'WITCH-5678-EFGH', FALSE), (9, 'WITCH-9012-IJKL', FALSE),
(10, 'ACVAL-1234-ABCD', FALSE), (10, 'ACVAL-5678-EFGH', FALSE), (10, 'ACVAL-9012-IJKL', FALSE),
(11, 'SPIDE-1234-ABCD', FALSE), (11, 'SPIDE-5678-EFGH', FALSE), (11, 'SPIDE-9012-IJKL', FALSE),
(12, 'BF204-1234-ABCD', FALSE), (12, 'BF204-5678-EFGH', FALSE), (12, 'BF204-9012-IJKL', FALSE),
(13, 'FORZA-1234-ABCD', FALSE), (13, 'FORZA-5678-EFGH', FALSE), (13, 'FORZA-9012-IJKL', FALSE),
(14, 'HALOI-1234-ABCD', FALSE), (14, 'HALOI-5678-EFGH', FALSE), (14, 'HALOI-9012-IJKL', FALSE),
(15, 'REVIL-1234-ABCD', FALSE), (15, 'REVIL-5678-EFGH', FALSE), (15, 'REVIL-9012-IJKL', FALSE),
(16, 'DEATH-1234-ABCD', FALSE), (16, 'DEATH-5678-EFGH', FALSE), (16, 'DEATH-9012-IJKL', FALSE),
(17, 'SEKIR-1234-ABCD', FALSE), (17, 'SEKIR-5678-EFGH', FALSE), (17, 'SEKIR-9012-IJKL', FALSE),
(18, 'GHOST-1234-ABCD', FALSE), (18, 'GHOST-5678-EFGH', FALSE), (18, 'GHOST-9012-IJKL', FALSE),
(19, 'MINEC-1234-ABCD', FALSE), (19, 'MINEC-5678-EFGH', FALSE), (19, 'MINEC-9012-IJKL', FALSE),
(20, 'AMONG-1234-ABCD', FALSE), (20, 'AMONG-5678-EFGH', FALSE), (20, 'AMONG-9012-IJKL', FALSE),
(21, 'DSIII-2101-AAAA', FALSE), (21, 'DSIII-2102-ABCD', FALSE), (21, 'DSIII-2103-BCDE', FALSE),
(22, 'FFXV-2201-AAAA', FALSE), (22, 'FFXV-2202-ABCD', FALSE), (22, 'FFXV-2203-BCDE', FALSE),
(23, 'DMC5-2301-AAAA', FALSE), (23, 'DMC5-2302-ABCD', FALSE), (23, 'DMC5-2303-BCDE', FALSE),
(24, 'RE4R-2401-AAAA', FALSE), (24, 'RE4R-2402-ABCD', FALSE), (24, 'RE4R-2403-BCDE', FALSE),
(25, 'SPID2-2501-AAAA', FALSE), (25, 'SPID2-2502-ABCD', FALSE), (25, 'SPID2-2503-BCDE', FALSE),
(26, 'ACMRG-2601-AAAA', FALSE), (26, 'ACMRG-2602-ABCD', FALSE), (26, 'ACMRG-2603-BCDE', FALSE),
(27, 'BLCK6-2701-AAAA', FALSE), (27, 'BLCK6-2702-ABCD', FALSE), (27, 'BLCK6-2703-BCDE', FALSE),
(28, 'MRTLK-2801-AAAA', FALSE), (28, 'MRTLK-2802-ABCD', FALSE), (28, 'MRTLK-2803-BCDE', FALSE),
(29, 'FCRY6-2901-AAAA', FALSE), (29, 'FCRY6-2902-ABCD', FALSE), (29, 'FCRY6-2903-BCDE', FALSE),
(30, 'HTMN3-3001-AAAA', FALSE), (30, 'HTMN3-3002-ABCD', FALSE), (30, 'HTMN3-3003-BCDE', FALSE),
(31, 'RE5-3101-AAAA', FALSE), (31, 'RE5-3102-ABCD', FALSE), (31, 'RE5-3103-BCDE', FALSE),
(32, 'DS2-3201-AAAA', FALSE), (32, 'DS2-3202-ABCD', FALSE), (32, 'DS2-3203-BCDE', FALSE),
(33, 'METRO-3301-AAAA', FALSE), (33, 'METRO-3302-ABCD', FALSE), (33, 'METRO-3303-BCDE', FALSE),
(34, 'SNIP5-3401-AAAA', FALSE), (34, 'SNIP5-3402-ABCD', FALSE), (34, 'SNIP5-3403-BCDE', FALSE),
(35, 'CREWF-3501-AAAA', FALSE), (35, 'CREWF-3502-ABCD', FALSE), (35, 'CREWF-3503-BCDE', FALSE),
(36, 'ATMHRT-3601-AAAA', FALSE), (36, 'ATMHRT-3602-ABCD', FALSE), (36, 'ATMHRT-3603-BCDE', FALSE),
(37, 'DAYSG-3701-AAAA', FALSE), (37, 'DAYSG-3702-ABCD', FALSE), (37, 'DAYSG-3703-BCDE', FALSE),
(38, 'CNTRL-3801-AAAA', FALSE), (38, 'CNTRL-3802-ABCD', FALSE), (38, 'CNTRL-3803-BCDE', FALSE),
(39, 'MAFIA-3901-AAAA', FALSE), (39, 'MAFIA-3902-ABCD', FALSE), (39, 'MAFIA-3903-BCDE', FALSE);


select * from digital_keys;


INSERT INTO discount_codes (code, discount_percentage, start_date, end_date, is_active) VALUES
('GAMER10', 10.00, '2025-01-01', '2025-12-31', TRUE), -- 10% di sconto, attivo
('SPRING20', 20.00, '2025-03-01', '2025-03-31', FALSE), -- 20% di sconto, scaduto
('WELCOME5', 5.00, '2025-01-01', '2025-12-31', TRUE); -- 5% di sconto, attivo

select * from discount_codes;