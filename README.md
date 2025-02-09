# Rapport du Projet - Gestion de Stock - V2

## 1. Prérequis

Ce projet a été développé sous **Windows 10/11** avec les technologies suivantes :

- **Node.js** v22.13.1 (LTS) – [Télécharger ici](https://nodejs.org/)
- **npm** (fourni avec Node.js)
- **MySQL Server** 8.0.41
- **MySQL Workbench Community** 8.0.41 – [Télécharger ici](https://dev.mysql.com/downloads/installer/)

Durant l'installation, vous devez selectionner les deux options suivantes au minimum :

- MySQL Server
- MySQL Workbench

## 2. Configuration des variables d'environnement

Vous devez configurer les variables d'environnement.

- Copier le fichier `.env.example` en `.env`:

```sh
cp .env.example .env
```

- Modifier le fichier `.env` avec vos propres valeurs.

## 3. Installation des dépendances

Les versions des dépendances sont définies dans `package.json`. Exécutez la commande suivante pour installer les dépendances :

```bash
    npm install
```

## 4. Initialisation de la base de données

Avant de démarrer le projet, vous devez initialiser la base de données. Pour cela, exécutez la commande suivante :

```bash
npm run init-db
```

Ce script va permettre :

- Fffectuer la connexion avec le serveur MySQL
- Créer la base de donnée défnie dans `env` avec les informations de connexion
- Exécuter les fichiers `db/bV2.sql` et `db/dataV2.sql` pour créer les tables et insérer les données

## 5. Lancement du projet

Pour démarrer le serveur, utilisez la commande suivante :

```bash
    npm start
```
