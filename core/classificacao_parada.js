const database = require("../utils/database.js");

let queryClassificacao = `SELECT l_cpu.cd_classificacao_parada cd_item_dominio, l_cpu.ds_classificacao_parada ds_item_dominio FROM sau_classificacao_parada l_cpu`;

async function findClassificacao(context) {
  let query = queryClassificacao;
  query += `\nWHERE fl_ativo = 1 AND (cd_aplicacao_parada = 'A')`;
  const binds = {};

  if (context.sg_usina) {
    binds.sg_usina = context.sg_usina;
    query += `\nOR cd_aplicacao_parada IN (SELECT id_tipo_usina FROM sau_usina WHERE sg_usina = :sg_usina)`;
  }

  query += `\nORDER BY TO_NUMBER(cd_classificacao_parada)`;

  console.log(query);
  const result = await database.simpleExecute(query, binds);
  return result.rows;
}
module.exports.findClassificacao = findClassificacao;

async function findById(context) {
  let query = queryClassificacao;

  if (context.id) {
    query += `\nWHERE l_cpu.cd_classificacao_parada = ${context.id}`;
    const result = await database.simpleExecute(query);
    return result.rows;
  } else {
    return false;
  }
}
module.exports.findById = findById;
