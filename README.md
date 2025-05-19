# Port de Russell API

API REST pour la gestion du port de Russell. Ce projet a été développé dans le cadre de la formation CEF pour apprendre à concevoir et déployer une API.

## Fonctionnalités principales

Cette API permet de gérer les opérations suivantes :

- **Gestion des Catways** :
  - Ajouter un nouveau catway
  - Récupérer tous les catways
  - Récupérer un catway par ID
  - Mettre à jour un catway existant
  - Supprimer un catway
- **Authentification JWT** :
  - Authentification sécurisée via tokens JWT pour sécuriser les accès.
- **Documentation Swagger** :
  - Une interface Swagger est intégrée pour tester l’API et visualiser la documentation.
  
## Prérequis

Avant d’installer cette API, vous devez avoir les éléments suivants :

- **Node.js** (version 14 ou supérieure)
- **MongoDB** : Une base de données MongoDB locale ou un service MongoDB cloud (par exemple, MongoDB Atlas).
- **npm** (Node Package Manager) pour gérer les dépendances.

## Technologies utilisées

Le projet a été réalisé avec les technologies suivantes :

- **Node.js** : Environnement d’exécution pour JavaScript côté serveur.
- **Express.js** : Framework web pour Node.js permettant de faciliter la création de routes API.
- **MongoDB** : Base de données NoSQL pour le stockage des données.
- **JWT (JSON Web Tokens)** : Authentification sécurisée pour protéger les accès aux routes sensibles.
- **Swagger** : Outil pour documenter et tester l’API.

## Structure du projet

Voici la structure de l’application :

- `routes/` : Contient les routes pour les entités comme les catways, dashboard, etc.
- `controllers/` : Contient la logique métier (ajout, modification, suppression de catways).
- `middleware/` : Middleware pour l’authentification JWT.
- `db/` : Fichier de connexion à la base de données MongoDB.
- `config/swagger.js` : Fichier de configuration de Swagger pour la documentation de l’API.
- `app.js` : Point d’entrée de l’application.

## Installation

Pour installer l’API sur votre machine locale, suivez ces étapes :

1. **Clonez le dépôt :**
    ```bash
    git clone https://github.com/Abdel-Aziz80/port-russell-api.git
    cd port-russell-api
    ```

2. **Installez les dépendances :**
    ```bash
    npm install
    ```

3. **Configurez MongoDB :**
    Assurez-vous que MongoDB est bien installé et en fonctionnement sur votre machine ou configurez une base de données sur MongoDB Atlas. Mettez à jour la connexion à la base de données dans le fichier `db/mongo.js`.

4. **Démarrez le serveur :**
    ```bash
    npm start
    ```

    Cela démarrera l’API sur `http://localhost:3000`.

## Documentation API avec Swagger

Une fois l’API démarrée, vous pouvez accéder à la documentation Swagger en ouvrant l’URL suivante dans votre navigateur :
