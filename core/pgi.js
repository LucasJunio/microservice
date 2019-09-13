const database = require("../utils/database.js");

// update de acordo com cd_pgi em ordem crescente
// UPDATE SAU_PGI SET CD_PARADA = 1
// WHERE cd_pgi IN (
//     SELECT cd_pgi FROM sau_pgi WHERE num_pgi = '1/2019' AND CD_PARADA IS NULL ORDER BY cd_pgi FETCH NEXT 1 ROWS ONLY
// )

async function update(context) {
  let query = "";
  if (context.cd_parada && context.num_pgi) {
    query = `UPDATE SAU_PGI`;
    query += `\nSET CD_PARADA = ${id_parada} WHERE NUM_PGI = ${num_pgi}`;

    result = await database.simpleExecute(query);
  }
  console.log(result);
  return result;
}

module.exports.update = update;
