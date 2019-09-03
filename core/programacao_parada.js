const database = require("../utils/database.js");

const queryNumeroParada = `SELECT CD_SEQ_PARADA FROM SAU_PROGRAMACAO_PARADA ORDER BY CD_PROGRAMACAO_PARADA DESC FETCH NEXT 1 ROWS ONLY`;

async function findNumeroParada() {
  console.log(queryNumeroParada);
  const result = await database.simpleExecute(queryNumeroParada);
  return result.rows;
}
module.exports.findNumeroParada = findNumeroParada;
