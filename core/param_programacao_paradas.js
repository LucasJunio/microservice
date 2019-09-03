const database = require("../utils/database.js");

async function find(context) {
  let query = "";
  const binds = {};

  if (context.data_inicio_programacao) {
    binds.data_inicio_programacao = context.data_inicio_programacao;
    console.log(binds.data_inicio_programacao);

    query = `SELECT a.dt_final_paradas_anuais, a.dt_final_paradas_programada, a.nr_prazo_parada_urgente 
    FROM sau_param_programacao_paradas a 
    WHERE TO_CHAR(a.dt_ano,'YYYY') = TO_CHAR(to_date(:data_inicio_programacao, 'DD/MM/YYYY'), 'YYYY')`;
  }

  const result = await database.simpleExecute(query, binds);
  return result.rows;
}

module.exports.find = find;

const queryNroAnosParadaLongoPrazo = `SELECT nr_anos_parada_longo_prazo FROM sau_param_programacao_paradas FETCH NEXT 1 ROWS ONLY`;

async function findNroAnosParadaLongoPrazo() {
  const result = await database.simpleExecute(queryNroAnosParadaLongoPrazo);
  return result.rows;
}

module.exports.findNroAnosParadaLongoPrazo = findNroAnosParadaLongoPrazo;
