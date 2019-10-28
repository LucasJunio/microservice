const database = require("../utils/database.js");

const baseQuery = `SELECT SG_UNIDADE_GERADORA DS_ITEM_DOMINIO, CD_UNIDADE_GERADORA CD_ITEM_DOMINIO
FROM sau_unidade_geradora`;

async function find(context) {
  let query = "";
  const binds = {};

  if (context.id) {
    query += baseQuery;
    binds.usinas_id = context.id;
    query += `\nWHERE cd_usina = :usinas_id`;
    query += `\nAND fl_ativo = 1 ORDER BY 1`;
  }

  console.log(query);
  const result = await database.simpleExecute(query, binds);
  return result.rows;
}

module.exports.find = find;
