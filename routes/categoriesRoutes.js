const pool = require("../db/db.js");

// Routes pour les catégories
const categoriesRoutes = ({ app }) => {
  //Récupérer toutes les catégories
  app.get("/categories", async (req, res) => {
    try {
      const [result] = await pool.query("SELECT * FROM categories");
      res.json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des catégories" });
    }
  });

  // Récupérer une catégorie par son ID
  app.get("/categories/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query(
        "SELECT * FROM categories WHERE id = ?",
        [id]
      );
      res.json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération de la catégorie" });
    }
  });

  // Ajouter une nouvelle catégorie
  app.post("/categories", async (req, res) => {
    const { nom } = req.body;
    try {
      await pool.query("INSERT INTO categories (nom) VALUES (?)", [nom]);
      res.json({ message: "Catégorie ajoutée" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de l'ajout de la catégorie" });
    }
  });

  // Mettre à jour une catégorie par son ID
  app.put("/categories/:id", async (req, res) => {
    const { nom } = req.body;
    const { id } = req.params;
    try {
      await pool.query("UPDATE categories SET nom = ? WHERE id = ?", [nom, id]);
      res.json({ message: "Catégorie mise à jour" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la mise à jour de la catégorie" });
    }
  });

  // Supprimer une categories par son ID
  app.delete("/categories/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM categories WHERE id = ?", [id]);
      res.json({ message: "Categorie supprimée" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression de la categorie" });
    }
  });
};

module.exports = { categoriesRoutes };
