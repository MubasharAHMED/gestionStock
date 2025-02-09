const pool = require("../db/db.js");

// Routes pour la relation fournisseurs - produits
const fournisseursProduitsRoutes = ({ app }) => {
  //Récupère toutes les relations fournisseur-produit
  app.get("/fournisseurs_produits", async (req, res) => {
    try {
      const [result] = await pool.query("SELECT * FROM fournisseurs_produits");
      res.json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des relations" });
    }
  });

  // Récupère une relation spécifique fournisseur-produit par produit_id et fournisseur_id
  app.get(
    "/fournisseurs_produits/:produit_id/:fournisseur_id",
    async (req, res) => {
      const { produit_id, fournisseur_id } = req.params;
      try {
        const [result] = await pool.query(
          `SELECT * FROM fournisseurs_produits WHERE produit_id = ? AND fournisseur_id = ?`,
          [produit_id, fournisseur_id]
        );
        if (result.length === 0) {
          return res.status(404).json({ message: "Relation non trouvée" });
        }
        res.json(result);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Erreur lors de la récupération de la relation" });
      }
    }
  );

  // Ajoute une nouvelle relation fournisseur-produit
  app.post("/fournisseurs_produits", async (req, res) => {
    const { produit_id, fournisseur_id, prix_achat } = req.body;
    try {
      const query = `INSERT INTO fournisseurs_produits (produit_id, fournisseur_id, prix_achat) VALUES (?, ?, ?)`;
      await pool.query(query, [produit_id, fournisseur_id, prix_achat]);
      res.status(201).json({ message: "Relation fournisseur-produit ajoutée" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de l'ajout de la relation fournisseur-produit",
      });
    }
  });

  //Met à jour une relation fournisseur-produit
  app.put(
    "/fournisseurs_produits/:produit_id/:fournisseur_id",
    async (req, res) => {
      const { produit_id, fournisseur_id } = req.params;
      const { prix_achat } = req.body;
      try {
        const query = `UPDATE fournisseurs_produits SET prix_achat = ? WHERE produit_id = ? AND fournisseur_id = ?`;
        const [result] = await pool.query(query, [
          prix_achat,
          produit_id,
          fournisseur_id,
        ]);
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ message: "Relation fournisseur-produit non trouvée" });
        }
        res.json({ message: "Relation mise à jour" });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message:
            "Erreur lors de la mise à jour de la relation fournisseur-produit",
        });
      }
    }
  );

  // Supprime une relation fournisseur-produit
  app.delete(
    "/fournisseurs_produits/:produit_id/:fournisseur_id",
    async (req, res) => {
      const { produit_id, fournisseur_id } = req.params;
      try {
        const query = `
      DELETE FROM fournisseurs_produits 
      WHERE produit_id = ? AND fournisseur_id = ?
    `;
        const [result] = await pool.query(query, [produit_id, fournisseur_id]);

        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ message: "Relation fournisseur-produit non trouvée" });
        }
        res.json({ message: "Relation supprimée" });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message:
            "Erreur lors de la suppression de la relation fournisseur-produit",
        });
      }
    }
  );
};

module.exports = { fournisseursProduitsRoutes };
