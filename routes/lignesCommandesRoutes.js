const pool = require("../db/db.js");

// Routes pour la relation fournisseurs - produits
const lignesCommandesRoutes = ({ app }) => {
  // Récupère toutes les lignes de commande
  app.get("/lignes_commande", async (req, res) => {
    try {
      const [result] = await pool.query("SELECT * FROM lignes_commande");
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de la récupération des lignes de commande",
      });
    }
  });

  // Récupère une ligne de commande spécifique par ID
  app.get("/lignes_commande/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query(
        "SELECT * FROM lignes_commande WHERE id = ?",
        [id]
      );
      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "Ligne de commande non trouvée" });
      }
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de la récupération de la ligne de commande",
      });
    }
  });

  // Ajoute une nouvelle ligne de commande
  app.post("/lignes_commande", async (req, res) => {
    const { commande_id, produit_id, quantite, prix_unitaire } = req.body;

    try {
      // Début de la transaction
      await pool.beginTransaction();

      // Vérifier la quantité en stock du produit
      const [produit] = await pool.query(
        "SELECT stock FROM produits WHERE id = ?",
        [produit_id]
      );

      if (!produit.length) {
        return res.status(404).json({ message: "Produit non trouvé" });
      }

      const stockDisponible = produit[0].stock;

      // Vérifier si la quantité demandée est disponible en stock
      if (quantite > stockDisponible) {
        return res.status(400).json({
          message: `Stock insuffisant pour ce produit. Quantité disponible : ${stockDisponible}`,
        });
      }

      // Ajouter la ligne de commande dans la base de données
      const query = `INSERT INTO lignes_commande (commande_id, produit_id, quantite, prix_unitaire) VALUES (?, ?, ?, ?)`;
      await pool.query(query, [
        commande_id,
        produit_id,
        quantite,
        prix_unitaire,
      ]);

      // Mettre à jour le stock du produit
      await pool.query("UPDATE produits SET stock = stock - ? WHERE id = ?", [
        quantite,
        produit_id,
      ]);

      // Fin de la transaction
      await pool.commit();

      res.status(201).json({
        message: "Ligne de commande ajoutée avec succès et stock mis à jour",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de l'ajout de la ligne de commande" });
    }
  });

  // Met à jour une ligne de commande
  app.put("/lignes_commande/:id", async (req, res) => {
    const { commande_id, produit_id, quantite, prix_unitaire } = req.body;
    const { id } = req.params;
    try {
      const query = `UPDATE lignes_commande SET commande_id = ?, produit_id = ?, quantite = ?, prix_unitaire = ? WHERE id = ?`;
      const [result] = await pool.query(query, [
        commande_id,
        produit_id,
        quantite,
        prix_unitaire,
        id,
      ]);
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Ligne de commande non trouvée" });
      }
      res.json({ message: "Ligne de commande mise à jour" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour de la ligne de commande",
      });
    }
  });

  // Supprime une ligne de commande
  app.delete("/lignes_commande/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const query = "DELETE FROM lignes_commande WHERE id = ?";
      const [result] = await pool.query(query, [id]);
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Ligne de commande non trouvée" });
      }
      res.json({ message: "Ligne de commande supprimée" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de la suppression de la ligne de commande",
      });
    }
  });
};

module.exports = { lignesCommandesRoutes };
