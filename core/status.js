const database = require("../utils/database.js");

const queryStatusParada = `SELECT ds_item_dominio, cd_item_dominio FROM sau_item_dominio WHERE cd_dominio = 'STATUS_PROG_PARADA' ORDER BY 1`;

async function findStatusParada() {
  const result = await database.simpleExecute(queryStatusParada);
  return result.rows;
}
module.exports.findStatusParada = findStatusParada;
