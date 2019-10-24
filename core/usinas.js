const database = require("../utils/database.js");

const baseQuery = `SELECT sg_usina ds_item_dominio, cd_usina cd_item_dominio
FROM sau_usina`;

async function find() {
  let query = baseQuery;
  query += '\nWHERE fl_ativo = 1 ORDER BY sg_usina'
  const result = await database.simpleExecute(query);

  return result.rows;
}

module.exports.find = find;

async function findById(context) {
  let query = baseQuery;
  if(context.id){
    query += `\nWHERE cd_usina = ${context.id} ORDER BY sg_usina`
    const result = await database.simpleExecute(query);
    return result.rows;
  }else{
    return false;
  }

}

module.exports.findById = findById;