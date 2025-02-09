require("dotenv").config();
const mysql = require("mysql2/promise");
const { executeSQLFile } = require("../utils/utils.js");

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  multipleStatements: true,
};

const initDB = async () => {
  try {
    // Connexion à la bdd
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connexion à MySQL réussie !");

    const dbName = process.env.DB_NAME; // Le nom de la base de données (bdd) est récupéré du .env

    // Création dynamique de la bdd
    await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\`;`);
    await connection.query(`CREATE DATABASE \`${dbName}\`;`);
    console.log(`Base de données '${dbName}' créée avec succès !`);

    // Utilisation de la bdd
    await connection.changeUser({ database: dbName });
    console.log(`Utilisation de la base : ${dbName} !`);

    // Création de la base de donnée et insertion des données
    await executeSQLFile(connection, "db/dbV2.sql");
    await executeSQLFile(connection, "db/dataV2.sql");

    console.log("Base de données initialisée avec succès !");

    // Fin de la connexion et du script
    connection.end();
    process.exit(0);
  } catch (err) {
    console.error(
      "Erreur lors de l'initialisation de la base de données :",
      err
    );
    process.exit(1);
  }
};

initDB();
