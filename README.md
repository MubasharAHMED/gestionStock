# Rapport du Projet - Gestion de Stock

## 1. Prerequis

Il faut ajouter les credentials pour la base de donnée dans un fichier **app.js** dans l'objet **dbConfig**.

### Installation

Commande pour installer les dépendances :

```bash
    npm install
```

### Lancement du projet

```bash
    npm start
```

## 2. Schéma de la base de données

### Modèle Conceptuel de Données (MCD)

Avant de pouvoir commencer le développement, j'ai modélisé la base via un MCD.

![Voici le MCD](./rapports/MCD_gestion_de_stock.PNG)

Dans ce modèle, j’ai mis des données non conformes à la création des tables. C'est à dire qu'une donnée ne doit pas être composée. Par exemple, le nom du client qui devrait être séparé en prénom et nom ou l'adresse qui pourrait être découpée en numéro, rue, code postal et ville.

### Scripts concernant la base de données

Après avoir fait le MCD, j'ai crée les scripts pour la création des tables (fichier **db.sql**), ainsi que les relations entre les tables et un script pour l’ajout des données (fichier **data.sql**).
