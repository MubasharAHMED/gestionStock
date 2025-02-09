const pool = require("../db/db.js");

// Routes pour les produits
const produitsRoutes = ({ app }) => {
  // Récupérer tous les produits
  app.get("/produits", async (req, res) => {
    try {
      const [result] = await pool.query("SELECT * FROM produits");
      res.json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des produits" });
    }
  });

  // Récupérer un produit par son ID
  app.get("/produits/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query("SELECT * FROM produits WHERE id = ?", [
        id,
      ]);
      res.json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération du produit" });
    }
  });

  // Ajouter un nouveau produit
  app.post("/produits", async (req, res) => {
    const { reference, nom, prix_unitaire, quantite, categorie_id } = req.body;
    try {
      await pool.query(
        "INSERT INTO produits (reference, nom, prix_unitaire, quantite, categorie_id) VALUES (?, ?, ?, ?, ?)",
        [reference, nom, prix_unitaire, quantite, categorie_id]
      );
      res.status(201).json({ message: "Produit ajouté avec succès" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de l'ajout du produit" });
    }
  });

  // Mettre à jour un produit par son ID
  app.put("/produits/:id", async (req, res) => {
    const { reference, nom, prix_unitaire, quantite, categorie_id } = req.body;
    const { id } = req.params;
    try {
      await pool.query(
        "UPDATE produits SET reference = ?, nom = ?, prix_unitaire = ?, quantite = ?, categorie_id = ? WHERE id = ?",
        [reference, nom, prix_unitaire, quantite, categorie_id, id]
      );
      res.json({ message: "Produit mis à jour" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la mise à jour du produit" });
    }
  });

  // Supprimer un produit par son ID
  app.delete("/produits/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM produits WHERE id = ?", [id]);
      res.json({ message: "Produit supprimé" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression du produit" });
    }
  });
};

module.exports = { produitsRoutes };
