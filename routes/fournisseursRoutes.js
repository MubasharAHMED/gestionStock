const pool = require("../db/db.js");

// Routes pour les fournisseurs
const fournisseursRoutes = ({ app }) => {
  //Récupérer toutes les fournisseurs
  app.get("/fournisseurs", async (req, res) => {
    try {
      const [result] = await pool.query("SELECT * FROM fournisseurs");
      res.json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des fournisseurs" });
    }
  });

  // Récupérer une fournisseur par son ID
  app.get("/fournisseurs/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query(
        "SELECT * FROM fournisseurs WHERE id = ?",
        [id]
      );
      res.json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération du fournisseur" });
    }
  });

  // Ajouter une nouvelle fournisseur
  app.post("/fournisseurs", async (req, res) => {
    const { nom } = req.body;
    try {
      await pool.query("INSERT INTO fournisseurs (nom) VALUES (?)", [nom]);
      res.json({ message: "fournisseur ajoutée" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de l'ajout du fournisseur" });
    }
  });

  // Mettre à jour une fournisseur par son ID
  app.put("/fournisseurs/:id", async (req, res) => {
    const { nom } = req.body;
    const { id } = req.params;
    try {
      await pool.query("UPDATE fournisseurs SET nom = ? WHERE id = ?", [
        nom,
        id,
      ]);
      res.json({ message: "fournisseur mise à jour" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la mise à jour du fournisseur" });
    }
  });

  // Supprimer une fournisseurs par son ID
  app.delete("/fournisseurs/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM fournisseurs WHERE id = ?", [id]);
      res.json({ message: "Categorie supprimée" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression de la categorie" });
    }
  });
};

module.exports = { fournisseursRoutes };
