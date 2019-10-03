const database = require("../utils/database.js");

const baseQuery = `SELECT sg_usina ds_item_dominio,
cd_usina cd_item_dominio,
'U'      id_conjunto_usina
FROM sau_usina
WHERE fl_ativo = 1
UNION
SELECT scu.sg_conjunto ds_item_dominio,
scu.cd_conjunto cd_item_dominio,
'C'             id_conjunto_usina
FROM sau_agrup_conjunto_usina acu
,sau_conjunto_usina scu
WHERE scu.fl_ativo = 1
AND acu.cd_conjunto = scu.cd_conjunto
ORDER BY 1`;

async function find() {
  let query = baseQuery;
  const binds = {};

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
