const database = require("../utils/database.js");
const verify = require("../utils/verifyType");

const baseQuery = `SELECT id.id_item_dominio, id.ds_item_dominio, id.cd_item_dominio
                      FROM sau_item_dominio id, sau_dominio do`;

const endQuery = `\nAND id.cd_dominio = do.cd_dominio ORDER BY 1`;

async function findTipoParada(context) {
  let query = baseQuery + `\nWHERE do.id_dominio = 'TIPO_PARADA'`;
  if (
    context.targetDate !== undefined &&
    context.refDate !== undefined &&
    context.annualDate !== undefined &&
    context.scheduledDate !== undefined &&
    context.urgentDeadline !== undefined &&
    context.years !== undefined
  ) {
    let type = verify.verifyType(context);
    query += `\nAND id.id_item_dominio = '${type}'`;
  }
  query += endQuery;

  const result = await database.simpleExecute(query);
  return result.rows;
}
module.exports.findTipoParada = findTipoParada;

async function findMotivoReprogramacao() {
  let query = baseQuery + `\nWHERE do.id_dominio = 'MOTIVO_REPROG_PARADA'` + endQuery;
  const result = await database.simpleExecute(query);
  return result.rows;
}
module.exports.findMotivoReprogramacao = findMotivoReprogramacao;

async function findStatusParada() {
  let query = baseQuery + `\nWHERE do.id_dominio = 'STATUS_PROG_PARADA'` + endQuery;
  const result = await database.simpleExecute(query);
  return result.rows;
}
module.exports.findStatusParada = findStatusParada;

async function findTags() {
  const result = [
    {
      buttons: ["button_save", "button_search", "button_new", "button_restartFlow", "button_approveFlow", "button_linkCancel", "button_reprogramming"],
      collapses: ["identificacao", "historico", "programacao", "execucao", "cancelamento"]
    }
  ];
  return result;
}

module.exports.findTags = findTags;

async function findSituacao() {
  let query = baseQuery + `\nWHERE do.id_dominio = 'SITUACAO_PROG_PARADA'` + endQuery;
  const result = await database.simpleExecute(query);
  return result.rows;
}

module.exports.findSituacao = findSituacao;
