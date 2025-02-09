const fs = require("fs");

const executeSQLFile = async (connection, filePath) => {
  const sql = fs.readFileSync(filePath, "utf8");
  await connection.query(sql);
  console.log(`${filePath} exécuté avec succès !`);
};

module.exports = { executeSQLFile };
