const pool = require("../db/db.js");

// Routes pour les clients
const clientsRoutes = ({ app }) => {
  // Récupère tous les clients
  app.get("/clients", async (req, res) => {
    try {
      const [result] = await pool.query("SELECT * FROM clients");
      res.json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des clients" });
    }
  });

  // Récupère un client spécifique par son ID
  app.get("/clients/:id", async (req, res) => {
    try {
      const query = "SELECT * FROM clients WHERE id = ?";
      const [result] = await pool.query(query, [req.params.id]);
      res.json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération du client" });
    }
  });

  // Ajoute un nouveau client
  app.post("/clients", async (req, res) => {
    const { nom, prenom, email, telephone, adresse, code_postal, ville } =
      req.body;
    try {
      const query = `INSERT INTO clients (nom, prenom, email, telephone, adresse, code_postal, ville) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      await pool.query(query, [
        nom,
        prenom,
        email,
        telephone,
        adresse,
        code_postal,
        ville,
      ]);
      res.status(201).json({ message: "Client ajouté avec succès" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de l'ajout du client" });
    }
  });

  // Met à jour un client spécifique par son ID
  app.put("/clients/:id", async (req, res) => {
    const { nom, prenom, email, telephone, adresse, code_postal, ville } =
      req.body;
    try {
      const query = `UPDATE clients SET nom = ?, prenom = ?, email = ?, telephone = ?, adresse = ?, code_postal = ?, ville = ? WHERE id = ?`;
      await pool.query(query, [
        nom,
        prenom,
        email,
        telephone,
        adresse,
        code_postal,
        ville,
        req.params.id,
      ]);
      res.json({ message: "Client mis à jour" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la mise à jour du client" });
    }
  });

  // Supprime un client spécifique par son ID
  app.delete("/clients/:id", async (req, res) => {
    try {
      const query = "DELETE FROM clients WHERE id = ?";
      await pool.query(query, [req.params.id]);
      res.json({ message: "Client supprimé" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression du client" });
    }
  });
};

module.exports = { clientsRoutes };
