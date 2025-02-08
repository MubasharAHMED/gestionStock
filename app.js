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

  app.get("/categories", async (req, res) => {
    const [result] = await connection.query("SELECT * FROM categories");
    res.json(result);
  });

  app.get("/categories/:id", async (req, res) => {
    const [result] = await connection.query(
      `SELECT * FROM categories WHERE id = ${req.params.id}`
    );
    res.json(result);
  });

  app.post("/categories", async (req, res) => {
    const { nom } = req.body;
    await connection.query(`INSERT INTO categories (nom) VALUES ('${nom}')`);
    res.json({ message: "Catégorie ajoutée" });
  });

  app.put("/categories/:id", async (req, res) => {
    const { nom } = req.body;
    await connection.query(
      `UPDATE categories SET nom = '${nom}' WHERE id = ${req.params.id}`
    );
    res.json({ message: "Catégorie mise à jour" });
  });

  app.get("/fournisseurs", async (req, res) => {
    const [result] = await connection.query("SELECT * FROM fournisseurs");
    res.json(result);
  });

  app.get("/fournisseurs/:id", async (req, res) => {
    const [result] = await connection.query(
      `SELECT * FROM fournisseurs WHERE id = ${req.params.id}`
    );
    res.json(result);
  });

  app.post("/fournisseurs", async (req, res) => {
    const { nom, contact, adresse } = req.body;
    await connection.query(
      `INSERT INTO fournisseurs (nom, contact, adresse) VALUES ('${nom}', '${contact}', '${adresse}')`
    );
    res.json({ message: "Fournisseur ajouté" });
  });

  app.put("/fournisseurs/:id", async (req, res) => {
    const { nom, contact, adresse } = req.body;
    await connection.query(
      `UPDATE fournisseurs SET nom = '${nom}', contact = '${contact}', adresse = '${adresse}' WHERE id = ${req.params.id}`
    );
    res.json({ message: "Fournisseur mis à jour" });
  });

  app.delete("/fournisseurs/:id", async (req, res) => {
    await connection.query(
      `DELETE FROM fournisseurs WHERE id = ${req.params.id}`
    );
    res.json({ message: "Fournisseur supprimé" });
  });

  app.get("/clients", async (req, res) => {
    const [result] = await connection.query("SELECT * FROM clients");
    res.json(result);
  });

  app.get("/clients/:id", async (req, res) => {
    const [result] = await connection.query(
      `SELECT * FROM clients WHERE id = ${req.params.id}`
    );
    res.json(result);
  });

  app.post("/clients", async (req, res) => {
    const { nom, email, adresse } = req.body;
    await connection.query(
      `INSERT INTO clients (nom, email, adresse) VALUES ('${nom}', '${email}', '${adresse}')`
    );
    res.json({ message: "Client ajouté" });
  });

  app.put("/clients/:id", async (req, res) => {
    const { nom, email, adresse } = req.body;
    await connection.query(
      `UPDATE clients SET nom = '${nom}', email = '${email}', adresse = '${adresse}' WHERE id = ${req.params.id}`
    );
    res.json({ message: "Client mis à jour" });
  });

  app.delete("/clients/:id", async (req, res) => {
    await connection.query(`DELETE FROM clients WHERE id = ${req.params.id}`);
    res.json({ message: "Client supprimé" });
  });

  app.get("/fournisseurs_produits", async (req, res) => {
    const [result] = await connection.query(
      "SELECT * FROM fournisseurs_produits"
    );
    res.json(result);
  });

  app.get(
    "/fournisseurs_produits/:produit_id/:fournisseur_id",
    async (req, res) => {
      const { produit_id, fournisseur_id } = req.params;
      const [result] = await connection.query(
        `SELECT * FROM fournisseurs_produits WHERE produit_id = ${produit_id} AND fournisseur_id = ${fournisseur_id}`
      );
      res.json(result);
    }
  );

  app.post("/fournisseurs_produits", async (req, res) => {
    const { produit_id, fournisseur_id, prix_achat } = req.body;
    await connection.query(
      `INSERT INTO fournisseurs_produits (produit_id, fournisseur_id, prix_achat) 
     VALUES (${produit_id}, ${fournisseur_id}, ${prix_achat})`
    );
    res.json({ message: "Relation fournisseur-produit ajoutée" });
  });

  app.put(
    "/fournisseurs_produits/:produit_id/:fournisseur_id",
    async (req, res) => {
      const { produit_id, fournisseur_id } = req.params;
      const { prix_achat } = req.body;
      await connection.query(
        `UPDATE fournisseurs_produits SET prix_achat = ${prix_achat} 
     WHERE produit_id = ${produit_id} AND fournisseur_id = ${fournisseur_id}`
      );
      res.json({ message: "Relation mise à jour" });
    }
  );

  app.delete(
    "/fournisseurs_produits/:produit_id/:fournisseur_id",
    async (req, res) => {
      const { produit_id, fournisseur_id } = req.params;
      await connection.query(
        `DELETE FROM fournisseurs_produits WHERE produit_id = ${produit_id} AND fournisseur_id = ${fournisseur_id}`
      );
      res.json({ message: "Relation supprimée" });
    }
  );

  app.get("/commandes", async (req, res) => {
    const [result] = await connection.query("SELECT * FROM commandes");
    res.json(result);
  });

  app.get("/commandes/:id", async (req, res) => {
    const { id } = req.params;
    const [result] = await connection.query(
      `SELECT * FROM commandes WHERE id = ${id}`
    );
    res.json(result);
  });

  app.post("/commandes", async (req, res) => {
    const { client_id, date_commande } = req.body;
    await connection.query(
      `INSERT INTO commandes (client_id, date_commande) 
     VALUES (${client_id}, '${date_commande}')`
    );
    res.json({ message: "Commande ajoutée" });
  });

  app.put("/commandes/:id", async (req, res) => {
    const { client_id, date_commande } = req.body;
    await connection.query(
      `UPDATE commandes SET client_id = ${client_id}, date_commande = '${date_commande}' 
     WHERE id = ${req.params.id}`
    );
    res.json({ message: "Commande mise à jour" });
  });

  app.delete("/commandes/:id", async (req, res) => {
    await connection.query(`DELETE FROM commandes WHERE id = ${req.params.id}`);
    res.json({ message: "Commande supprimée" });
  });

  app.get("/lignes_commande", async (req, res) => {
    const [result] = await connection.query("SELECT * FROM lignes_commande");
    res.json(result);
  });

  app.get("/lignes_commande/:id", async (req, res) => {
    const [result] = await connection.query(
      `SELECT * FROM lignes_commande WHERE id = ${req.params.id}`
    );
    res.json(result);
  });

  app.get("/commandes/:commande_id/lignes", async (req, res) => {
    const [result] = await connection.query(
      `SELECT * FROM lignes_commande WHERE commande_id = ${req.params.commande_id}`
    );
    res.json(result);
  });

  app.post("/lignes_commande", async (req, res) => {
    const { commande_id, produit_id, quantite, prix_unitaire } = req.body;
    await connection.query(
      `INSERT INTO lignes_commande (commande_id, produit_id, quantite, prix_unitaire) 
     VALUES (${commande_id}, ${produit_id}, ${quantite}, ${prix_unitaire})`
    );
    res.json({ message: "Ligne de commande ajoutée" });
  });

  app.put("/lignes_commande/:id", async (req, res) => {
    const { commande_id, produit_id, quantite, prix_unitaire } = req.body;
    await connection.query(
      `UPDATE lignes_commande SET commande_id = ${commande_id}, produit_id = ${produit_id}, 
     quantite = ${quantite}, prix_unitaire = ${prix_unitaire} WHERE id = ${req.params.id}`
    );
    res.json({ message: "Ligne de commande mise à jour" });
  });

  app.delete("/lignes_commande/:id", async (req, res) => {
    await connection.query(
      `DELETE FROM lignes_commande WHERE id = ${req.params.id}`
    );
    res.json({ message: "Ligne de commande supprimée" });
  });

  app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
  });
});
