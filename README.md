# Rapport du Projet - Gestion de Stock

## 1. Prérequis

Ce projet a été développé sous **Windows 10/11** avec les technologies suivantes :

- **Node.js** v22.13.1 (LTS) – [Télécharger ici](https://nodejs.org/)
- **npm** (fourni avec Node.js)
- **MySQL Server** 8.0.41
- **MySQL Workbench Community** 8.0.41 – [Télécharger ici](https://dev.mysql.com/downloads/installer/)

**Installation MySQL** :

- MySQL Server
- MySQL Workbench

**Configuration** :

Ajoutez vos identifiants de votre base de données dans le fichier **app.js**, dans l'objet **dbConfig**.

### Installation

Les versions des dépendances sont définies dans **package.json**. Exécutez la commande suivante pour installer les dépendances :

```bash
    npm install
```

### Lancement du projet

Pour démarrer le serveur, utilisez la commande suivante :

```bash
    npm start
```

## 2. Schéma de la base de données

### A - Modèle Conceptuel de Données (MCD)

Avant de pouvoir commencer le développement, j'ai modélisé la base via un MCD.

![Voici le MCD](./rapports/MCD_gestion_de_stock.PNG)

Dans ce modèle, j’ai mis des données non conformes à la création des tables. C'est à dire qu'une donnée ne doit pas être composée. Par exemple, le nom du client qui devrait être séparé en prénom et nom ou l'adresse qui pourrait être découpée en numéro, rue, code postal et ville.

### B - Scripts concernant la base de données

Après avoir fait le MCD, j'ai crée les scripts pour la création des tables (fichier **db.sql**), ainsi que les relations entre les tables et un script pour l’ajout des données (fichier **data.sql**).

### C - Développement de l'API

Après la création des tables et l'insertion des données, j'ai entamé le développement de l'API en utilisant Node.js et Express.

L'objectif de cette API est de permettre la gestion des différentes entités du projet via des opérations CRUD (Créer, Lire, Mettre à jour, Supprimer). L’API ne possède pas encore de tests automatisés. Chaque route doit être testée manuellement en utilisant Postman, cURL ou un autre client REST.
