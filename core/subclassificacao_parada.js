const database = require("../utils/database.js");

let querySubClassificacao = `SELECT cd_subclassificacao_parada, ds_subclassificacao_parada FROM sau_subclassificacao_parada WHERE fl_ativo = 1`;

async function findSubClassificacao(context) {
  let query = querySubClassificacao;
  const binds = {};

  if (context.sg_usina && context.cd_classificacao_parada) {
    binds.sg_usina = context.sg_usina;
    binds.cd_classificacao_parada = context.cd_classificacao_parada;
    query += `\nAND cd_classificacao_parada = :cd_classificacao_parada AND (cd_aplicacao_usina IN (SELECT id_tipo_usina FROM sau_usina WHERE sg_usina = :sg_usina) OR cd_aplicacao_usina = 'A')`;
  }

  query += `\nORDER BY cd_subclassificacao_parada`;

  console.log(query);
  const result = await database.simpleExecute(query, binds);
  return result.rows;
}
module.exports.findSubClassificacao = findSubClassificacao;
