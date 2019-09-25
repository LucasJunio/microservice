const database = require("../utils/database.js");

async function update(context) {
  let query = "";
  if (context.cd_parada && context.num_pgi) {
    query = `UPDATE SAU_PGI SET CD_PARADA = ${context.cd_parada}`;
    query += `\nWHERE cd_pgi IN (SELECT cd_pgi FROM sau_pgi WHERE num_pgi = ${context.num_pgi} AND CD_PARADA IS NULL ORDER BY cd_pgi FETCH NEXT 1 ROWS ONLY)`;

    result = await database.simpleExecute(query);
  }
  console.log(result);
  return result;
}

module.exports.update = update;

async function getNumPGI(context) {
  let query = "";
  let result = "";

  if (context.cd_parada) {
    query = `SELECT num_pgi FROM sau_pgi`;
    query += `\nWHERE CD_PROGRAMACAO_PARADA = ${context.cd_parada} FETCH NEXT 1 ROWS ONLY`;

    result = await database.simpleExecute(query);
  }
  console.log(result.rows);
  return result.rows;
}

module.exports.getNumPGI = getNumPGI;
