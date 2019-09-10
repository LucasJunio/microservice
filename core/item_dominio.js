const database = require("../utils/database.js");
const verify = require("../utils/verifyType");

const baseQuery = `SELECT ds_item_dominio, cd_item_dominio FROM sau_item_dominio`;

async function findTipoParada(context) {
  let query = baseQuery + `\nWHERE cd_dominio = 'TIPO_PARADA'`;

  if (
    context.targetDate !== "undefined" &&
    context.refDate !== "undefined" &&
    context.annualDate !== "undefined" &&
    context.scheduledDate !== "undefined" &&
    context.urgentDeadline !== "undefined" &&
    context.years !== "undefined"
  ) {
    let type = verify.verifyType(context);
    query += `\nAND CD_ITEM_DOMINIO = '${type}'`;
  }
  query += `\nORDER BY 1`;

  const result = await database.simpleExecute(query);
  return result.rows;
}
module.exports.findTipoParada = findTipoParada;

async function findMotivoReprogramacao() {
  let query =
    baseQuery + `\nWHERE cd_dominio = 'MOTIVO_REPROG_PARADA' ORDER BY 1`;
  const result = await database.simpleExecute(query);
  return result.rows;
}
module.exports.findMotivoReprogramacao = findMotivoReprogramacao;

async function findStatusParada() {
  let query =
    baseQuery + `\nWHERE cd_dominio = 'STATUS_PROG_PARADA' ORDER BY 1`;
  const result = await database.simpleExecute(query);
  return result.rows;
}
module.exports.findStatusParada = findStatusParada;
