const database = require("../utils/database.js");

const baseQuery = `SELECT ds_item_dominio, cd_item_dominio FROM sau_item_dominio`;

async function findTipoParada() {
  let query = baseQuery + `\nWHERE cd_dominio = 'TIPO_PARADA' ORDER BY 1`;
  const result = await database.simpleExecute(query);
  return result.rows;
}
module.exports.findTipoParada = findTipoParada;

async function findMotivoReprogramacao() {
  let query = baseQuery + `\nWHERE cd_dominio = 'MOTIVO_REPROG_PARADA' ORDER BY 1`;
  const result = await database.simpleExecute(query);
  return result.rows;
}
module.exports.findMotivoReprogramacao = findMotivoReprogramacao;
