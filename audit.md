# Audit de la version 1 - Gestion de Stock

Dans le cadre du développement de la version 1 (V1) de l'application, une analyse approfondie a été réalisée pour identifier les principales failles de sécurité, les problèmes techniques et les améliorations possibles. Cette analyse met en évidence plusieurs points critiques et les solutions afin de garantir une sécurité optimale, une meilleure performance, et une expérience utilisateur plus fluide pour la prochaine version (V2).

L'audit a permis de repérer des vulnérabilités importantes, telles que des risques d'injection SQL et l'absence de validation des entrées utilisateurs. Il a également révélé des défauts dans la gestion des erreurs, des pratiques de codage qui nuisent à la maintenabilité, ainsi que des problèmes de configuration, notamment au niveau du serveur et de la base de données.

L'objectif de ce rapport est de fournir un état des lieux détaillé, structuré en différentes catégories, afin de prioriser les actions à entreprendre pour améliorer la sécurité, la performance et la qualité générale du produit.

## 1. Failles de sécurité

**Injection SQL (SQLi)** : Les requêtes SQL sont construites par concaténation de chaînes de caractères, exposant l'application à des attaques par injection SQL.

**Exemple** : La requête est vulnérable à l'attaque SQLi car elle concatène directement les données de l'utilisateur dans la requête.

```js
const query = `SELECT * FROM clients WHERE id = ${client_id}`;
```

La requête (voir ci-dessous) exploite l'injection SQL pour retourner tous les clients car 1=1 est toujours vrai.

```bash
GET http://localhost:3000/clients?id=1 OR 1=1
```

**Solution** : Passer à des requêtes paramétrées, utiliser un ORM comme Sequelize ou utiliser les procédures stockées pour éviter ce type de vulnérabilité. Il est également préférable de valider les entrées utilisateur pour s'assurer que c'est bien un nombre comme dans cet exemple.

##

**Données sensibles codées en dur**

Les identifiants de base de données sont présents directement dans le code source.
De plus, le port du serveur est défini en dur dans le code, ce qui est peu flexible.

**Solution** : Utiliser des variables d'environnement pour stocker ces informations sensibles.

## 2. Problème liés au serveur (API)

**Absence de validation des entrées**

Il n'y a aucune validation des données reçues des utilisateurs. Cela inclut des valeurs incorrectes, comme des quantités négatives, ou des champs vides.

**Solution** : Ajouter des validations côté serveur.

##

**Gestion des erreurs non implémentée**

Le système actuel ne gère pas les erreurs de manière centralisée. Cela peut entraîner des plantages ou des fuites d'informations sensibles.

**Solution** : Implémenter un middleware de gestion des erreurs pour capter toutes les erreurs et renvoyer des réponses claires sans exposer de détails internes. On peut également ajouter un bloc de try/catch pour intercepter les erreurs et réagir en fonction de l'erreur.

##

**Code non commenté**

Le code manque de commentaires, rendant difficile sa compréhension et sa maintenance.

**Solution** : Ajouter des commentaires explicatifs

##

**Pas de tests automatisés des routes**

Les routes ne sont pas testées de manière systématique et des tests manuels sont nécessaires, ce qui peut entraîner des erreurs humaines.

**Solution** : Mettre en place des tests automatisés (unitaires et d'intégration) à l'aide d'outils comme Jest ou utiliser Swagger.

##

**Connexion unique pour toutes les routes**

Une seule connexion est utilisée pour toutes les routes, ce qui peut provoquer des ralentissements et des problèmes de performance en cas de forte charge.

**Solution** : Utiliser une connexion par routes.

##

**Pas de système d’authentification pour l’API**

L'API ne comporte pas de systèmes d'authentification pour vérifier l'identité des utilisateurs. N'importe qui peut accéder à toutes les routes.

**Solution** : Ajouter une authentification basée sur JWT ou OAuth pour sécuriser l'accès à l'API.

## 3. Problèmes liés à la base de données

**Recréation de la base de données à chaque redémarrage**

À chaque redémarrage du serveur, la base de données est recréée, ce qui entraîne la perte de toutes les données insérées.

**Solution** : Créer un seul script qui doit être lancé via une commande par le développeur avant de démarrer le serveur. De ce fait, le serveur n'a plus la responsabilité de créer la base de données.

##

**Aucune vérification de la cohérence des données dans la base**

Il n’y a pas de contrôle sur la cohérence des données, par exemple la possibilité de commander des produits absents du catalogue ou avec des quantités négatives.

**Solution** : Ajouter des vérifications de cohérence avant d’insérer ou de mettre à jour des données (exemple : vérifier la disponibilité des produits avant de valider une commande).

##

**Convention non conforme**

Les attributs ne respecte pas les conventions. Par exemple, le nom dans client doit etre divisé en deux attributs, comme nom et prénom par exemple. Même remarque pour l'adresse. Il doit y avoir un attribut code postal.

**Solution** : Ajouter les attributs pour respecter les conventions.
