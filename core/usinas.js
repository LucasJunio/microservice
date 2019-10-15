const database = require("../utils/database.js");

const baseQuery = `SELECT sg_usina ds_item_dominio, cd_usina cd_item_dominio
FROM sau_usina WHERE fl_ativo = 1 ORDER BY sg_usina`;

async function find() {
  let query = baseQuery;

  const result = await database.simpleExecute(query);

  return result.rows;
}

module.exports.find = find;
