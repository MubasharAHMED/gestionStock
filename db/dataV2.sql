-- Insertion dans la table des catégories
INSERT INTO categories (nom) VALUES 
('Électronique'),
('Vêtements'),
('Alimentation'),
('Meubles'),
('Jouets');

-- Insertion dans la table des produits
INSERT INTO produits (reference, nom, prix_unitaire, quantite, categorie_id) VALUES 
('P123', 'Smartphone', 599.99, 50, 1),
('P124', 'Casque Bluetooth', 99.99, 150, 1),
('P125', 'T-shirt en coton', 19.99, 200, 2),
('P126', 'Jeans en denim', 49.99, 180, 2),
('P127', 'Pizza Margherita', 8.99, 500, 3),
('P128', 'Bouteille d\'eau', 0.99, 1000, 3),
('P129', 'Canapé 3 places', 399.99, 30, 4),
('P130', 'Chaise de bureau', 129.99, 100, 4),
('P131', 'Peluche', 14.99, 300, 5),
('P132', 'Lego City', 29.99, 250, 5);

-- Insertion dans la table des fournisseurs
INSERT INTO fournisseurs (nom, prenom, telephone, adresse, code_postal, ville) VALUES
('Fournisseur', 'A', '0102030405', '123 Rue Exemple, Paris', '75000', 'Paris'),
('Fournisseur', 'B', '0102030406', '456 Rue Test, Lyon', '69000', 'Lyon'),
('Fournisseur', 'C', '0102030407', '789 Rue Imaginaire, Marseille', '13000', 'Marseille'),
('Fournisseur', 'D', '0102030408', '321 Rue Fictive, Toulouse', '31000', 'Toulouse'),
('Fournisseur', 'E', '0102030409', '654 Rue ABC, Bordeaux', '33000', 'Bordeaux');

-- Insertion dans la table de relation entre produits et fournisseurs
INSERT INTO fournisseurs_produits (produit_id, fournisseur_id, prix_achat) VALUES
(1, 1, 350.00),
(2, 1, 45.00),
(3, 2, 10.00),
(4, 2, 25.00),
(5, 3, 5.00),
(6, 3, 0.50),
(7, 4, 250.00),
(8, 4, 75.00),
(9, 5, 10.00),
(10, 5, 15.00);

-- Insertion dans la table des clients
INSERT INTO clients (nom, prenom, email, telephone, adresse, code_postal, ville) VALUES
('Dupont', 'Jean', 'jean.dupont@example.com', '0123456789', '10 Rue de Paris, Paris', '75001', 'Paris'),
('Martin', 'Sophie', 'sophie.martin@example.com', '0123456790', '20 Avenue de Lyon, Lyon', '69002', 'Lyon'),
('Lemoine', 'Paul', 'paul.lemoine@example.com', '0123456791', '30 Boulevard de Marseille, Marseille', '13001', 'Marseille'),
('Benoit', 'Claire', 'claire.benoit@example.com', '0123456792', '40 Rue Toulouse, Toulouse', '31001', 'Toulouse'),
('Durand', 'Pierre', 'pierre.durand@example.com', '0123456793', '50 Rue Bordeaux, Bordeaux', '33001', 'Bordeaux');

-- Insertion dans la table des commandes
INSERT INTO commandes (client_id, date_commande) VALUES
(1, '2025-01-10'),
(2, '2025-01-12'),
(3, '2025-01-15'),
(4, '2025-01-20'),
(5, '2025-01-22');

-- Insertion dans la table des lignes de commande
INSERT INTO lignes_commande (commande_id, produit_id, quantite, prix_unitaire) VALUES
(1, 1, 1, 599.99),
(1, 2, 2, 99.99),
(2, 3, 3, 19.99),
(2, 4, 1, 49.99),
(3, 5, 5, 8.99),
(3, 6, 10, 0.99),
(4, 7, 1, 399.99),
(4, 8, 2, 129.99),
(5, 9, 2, 14.99),
(5, 10, 3, 29.99);
