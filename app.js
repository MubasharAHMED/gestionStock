require("dotenv").config();
const express = require("express");
const pool = require("./db/db.js");
const { produitsRoutes } = require("./routes/produitsRoutes.js");
const { categoriesRoutes } = require("./routes/categoriesRoutes.js");
const { fournisseursRoutes } = require("./routes/fournisseursRoutes.js");
const { clientsRoutes } = require("./routes/clientsRoutes.js");
const { commandesRoutes } = require("./routes/commandesRoutes.js");
const {
  fournisseursProduitsRoutes,
} = require("./routes/fournisseursProduitsRoutes.js");
const { lignesCommandesRoutes } = require("./routes/lignesCommandesRoutes.js");

const app = express();
app.use(express.json());

produitsRoutes({ app });
categoriesRoutes({ app });
fournisseursRoutes({ app });
clientsRoutes({ app });
commandesRoutes({ app });
fournisseursProduitsRoutes({ app });
lignesCommandesRoutes({ app });

// Ferme la pool de connexion lorsque l'application s'arrête
process.on("SIGINT", () => {
  console.log("Fermeture de la pool de connexions...");
  pool.end();
  process.exit();
});

app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur le port ${process.env.PORT}`);
});
