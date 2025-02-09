const pool = require("../db/db.js");

// Routes pour les commandes
const commandesRoutes = ({ app }) => {
  // Récupère toutes les commandes
  app.get("/commandes", async (req, res) => {
    try {
      const [result] = await pool.query("SELECT * FROM commandes");
      res.json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des commandes" });
    }
  });

  // Récupère une commande spécifique par son ID
  app.get("/commandes/:id", async (req, res) => {
    try {
      const query = "SELECT * FROM commandes WHERE id = ?";
      const [result] = await pool.query(query, [req.params.id]);
      res.json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération de la commande" });
    }
  });

  // Ajoute une nouvelle commande
  app.post("/commandes", async (req, res) => {
    const { client_id, date_commande } = req.body;
    try {
      const query = `
      INSERT INTO commandes (client_id, date_commande) 
      VALUES (?, ?)
    `;
      await pool.query(query, [client_id, date_commande]);
      res.status(201).json({ message: "Commande ajoutée avec succès" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de l'ajout de la commande" });
    }
  });

  // Met à jour une commande spécifique par son ID
  app.put("/commandes/:id", async (req, res) => {
    const { client_id, date_commande } = req.body;
    try {
      const query = `UPDATE commandes SET client_id = ?, date_commande = ? WHERE id = ?`;
      await pool.query(query, [client_id, date_commande, req.params.id]);
      res.json({ message: "Commande mise à jour" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la mise à jour de la commande" });
    }
  });

  // Supprime une commande spécifique par son ID
  app.delete("/commandes/:id", async (req, res) => {
    try {
      const query = "DELETE FROM commandes WHERE id = ?";
      await pool.query(query, [req.params.id]);
      res.json({ message: "Commande supprimée" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression de la commande" });
    }
  });
};

module.exports = { commandesRoutes };
