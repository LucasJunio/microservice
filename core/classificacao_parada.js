const database = require("../utils/database.js");

let queryClassificacao = `SELECT l_cpu.cd_classificacao_parada, l_cpu.ds_classificacao_parada FROM sau_classificacao_parada l_cpu WHERE fl_ativo = 1 
AND (cd_aplicacao_parada = 'A')`;

const queryNovaClassificacao = `SELECT l_cpu.cd_classificacao_parada cod_classif_parada_unidade,
l_cpu.ds_classificacao_parada descr_classif_parada_unidade
FROM sau.sau_classificacao_parada l_cpu
WHERE fl_ativo = 1
AND (cd_aplicacao_parada = 'A'
OR cd_aplicacao_parada IN (SELECT id_tipo_usina
FROM sau.sau_usina
WHERE sg_usina = 'UHET'))
ORDER BY cod_classif_parada_unidade`;

async function findClassificacao(context) {
  let query = queryClassificacao;
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

async function findNovaClassificacao() {
  console.log(queryNovaClassificacao);
  const result = await database.simpleExecute(queryNovaClassificacao);
  return result.rows;
}
module.exports.findNovaClassificacao = findNovaClassificacao;
