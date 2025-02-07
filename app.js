const express = require("express");
const mysql = require("mysql2/promise");
const fs = require("fs");

const app = express();
app.use(express.json());

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  multipleStatements: true,
};

const executeSQLFile = async (connection, filePath) => {
  const sql = fs.readFileSync(filePath, "utf8");
  await connection.query(sql);
  console.log(`${filePath} exécuté avec succès`);
};

const initDB = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connexion à MySQL réussie");

    await executeSQLFile(connection, "db.sql");

    await connection.changeUser({ database: "gestion_stock" });

    await executeSQLFile(connection, "data.sql");

    console.log("Base de données initialisée avec succès");
    return connection;
  } catch (err) {
    console.error(
      "Erreur lors de l'initialisation de la base de données :",
      err
    );
    process.exit(1);
  }
};

initDB().then((connection) => {
  app.get("/produits", async (req, res) => {
    const [result] = await connection.query("SELECT * FROM produits");
    res.json(result);
  });

  app.get("/produits/:id", async (req, res) => {
    const [result] = await connection.query(
      `SELECT * FROM produits WHERE id=${req.params.id}`
    );
    res.json(result);
  });

  app.post("/produits", async (req, res) => {
    const { reference, nom, prix_unitaire, quantite, categorie_id } = req.body;
    const query = `INSERT INTO produits (reference, nom, prix_unitaire, quantite, categorie_id) VALUES ('${reference}', '${nom}', ${prix_unitaire}, ${quantite}, ${categorie_id})`;
    await connection.query(query);
    res.status(201).json({ message: "Produit ajouté avec succès" });
  });

  app.put("/produits/:id", async (req, res) => {
    const { reference, nom, prix_unitaire, quantite, categorie_id } = req.body;
    await connection.query(
      `UPDATE produits SET reference = '${reference}', nom = '${nom}', prix_unitaire = ${prix_unitaire}, quantite = ${quantite}, categorie_id = ${categorie_id} WHERE id = ${req.params.id}`
    );
    res.json({ message: "Produit mis à jour" });
  });

  app.delete("/produits/:id", async (req, res) => {
    await connection.query(`DELETE FROM produits WHERE id = ${req.params.id}`);
    res.json({ message: "Produit supprimé" });
  });

  app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
  });
});
