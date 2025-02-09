# 2. Livrables - V1

## 2.A Schéma de la base de données / Modèle Conceptuel de Données (MCD)

Avant de pouvoir commencer le développement, j'ai modélisé la base via un MCD.

![Voici le MCD](./MCD_gestion_de_stock.PNG)

Dans ce modèle, j’ai mis des données non conformes à la création des tables. C'est à dire qu'une donnée ne doit pas être composée. Par exemple, le nom du client qui devrait être séparé en prénom et nom ou l'adresse qui pourrait être découpée en numéro, rue, code postal et ville.

## 2.B Scripts concernant la base de données

Après avoir fait le MCD, j'ai crée les scripts pour la création des tables (fichier **db.sql**), ainsi que les relations entre les tables et un script pour l’ajout des données (fichier **data.sql**).

## 2.C Développement de l'API

Après la création des tables et l'insertion des données, j'ai entamé le développement de l'API en utilisant Node.js et Express.

L'objectif de cette API est de permettre la gestion des différentes entités du projet via des opérations CRUD (Créer, Lire, Mettre à jour, Supprimer). L’API ne possède pas encore de tests automatisés. Chaque route doit être testée manuellement en utilisant Postman, cURL ou un autre client REST.

## 2.E Développement de la version 2 (V2)

Après avoir effectué l'audit de la V1. Je commence à développer la V2. Dans cette version, il y aura les solutions expliqués dans l'audit.

## 2.F Livrable final

### Résumé de l'audit

**Introduction**

L’audit de la version 1 de l’application a révélé plusieurs problèmes liés à la sécurité, à la performance et à la structure du code, impactant la maintenabilité et la qualité générale de l’application. Ce rapport présente les failles identifiées et propose des solutions pour la version 2 (V2).

1. Failles de sécurité

   Injection SQL : L’application est vulnérable à des attaques par injection SQL, dues à la concaténation de données utilisateur dans les requêtes. Solution : Utiliser des requêtes paramétrées ou un ORM comme Sequelize.
   Données sensibles codées en dur : Les identifiants et configurations sont stockés directement dans le code source. Solution : Utiliser des variables d'environnement pour protéger ces données.

2. Problèmes côté serveur (API)

   Absence de validation des entrées : Aucune vérification des données reçues, permettant des erreurs comme des quantités négatives. Solution : Implémenter des validations côté serveur.
   Gestion des erreurs non centralisée : Le système d’erreur n’est pas géré de manière centralisée, ce qui peut exposer des informations sensibles. Solution : Ajouter un middleware de gestion des erreurs.
   Code non commenté et absence de tests automatisés : Le code manque de lisibilité et les tests manuels sont risqués. Solution : Ajouter des commentaires et implémenter des tests automatisés.

3. Problèmes de base de données

   Recréation de la base de données à chaque redémarrage : Cela entraîne la perte des données insérées. Solution : Utiliser un script de migration de base de données.
   Vérifications manquantes sur la cohérence des données : Aucune validation avant l’insertion de données, comme vérifier la disponibilité des produits. Solution : Ajouter des vérifications de cohérence.
   Non-respect des conventions de nommage : Les champs comme le nom du client ne sont pas divisés de manière correcte. Solution : Revoir la structure de la base de données pour respecter les conventions.

4. Problèmes liés à la gestion de projet

   Arborescence du projet linéaire : Le code est difficile à maintenir. Solution : Restructurer le projet pour améliorer l’organisation des fichiers.

Conclusion

L’audit a mis en évidence des failles de sécurité majeures et des problèmes techniques. Les solutions proposées pour la version 2 incluent des requêtes sécurisées, la validation des données, une gestion des erreurs centralisée, ainsi qu’une meilleure organisation du code et des tests automatisés. Ces améliorations garantiront une meilleure sécurité, performance et maintenabilité du projet.
