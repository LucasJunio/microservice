const database = require("../utils/database.js");

const baseQuery = `SELECT sg_unidade_geradora unidade_geradora
FROM sau_unidade_geradora 
WHERE fl_ativo = '1' `;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.usinas_id = context.id;
    query += `\nand SG_USINA = :usinas_id`;
  }

  query += `\nORDER BY cd_unidade_geradora`;

  console.log(query);
  const result = await database.simpleExecute(query, binds);
  return result.rows;
}

module.exports.find = find;
