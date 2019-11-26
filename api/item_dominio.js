const {onBadRequest, onSuccess} = require("../utils/handlers");

const item_dominio = require("../core/item_dominio.js");
const param_prog_paradas = require("../core/param_programacao_paradas.js");
const moment = require("moment");

async function getTipoParada(req, res, next) {
  try {
    const context = {};

    context.data_inicio_programacao = moment(
      req.query.dt_inicio_programacao
    ).format("DD/MM/YYYY");

    const rowsProgParada = await param_prog_paradas.find(context);

    context.annualDate = rowsProgParada[0]["DT_FINAL_PARADAS_ANUAIS"];
    context.scheduledDate = rowsProgParada[0]["DT_FINAL_PARADAS_PROGRAMADA"];
    context.urgentDeadline = rowsProgParada[0]["NR_PRAZO_PARADA_URGENTE"];

    const rowsParadaLong = await param_prog_paradas.findNroAnosParadaLongoPrazo();

    context.years = rowsParadaLong[0]["NR_ANOS_PARADA_LONGO_PRAZO"];
    context.refDate = req.query.dt_ref_mapa;
    context.targetDate = context.data_inicio_programacao;

    const rows = await item_dominio.findTipoParada(context);

    onSuccess(res, rows);
  } catch (error) {
    onBadRequest(res, error.message);
  }
}

module.exports.getTipoParada = getTipoParada;

async function getMotivoReprogramacao(req, res, next) {
  try {
    const rows = await item_dominio.findMotivoReprogramacao();

    onSuccess(res, rows);
  } catch (error) {
    onBadRequest(res, error.message);
  }
}

module.exports.getMotivoReprogramacao = getMotivoReprogramacao;

async function getStatusParada(req, res, next) {
  try {
    const rows = await item_dominio.findStatusParada();

    onSuccess(res, rows);
  } catch (error) {
    onBadRequest(res, error.message);
  }
}

module.exports.getStatusParada = getStatusParada;

async function getTags(req, res, next) {
  try {
    const rows = await item_dominio.findTags();

    onSuccess(res, rows);
  } catch (error) {
    onBadRequest(res, error.message);
  }
}

module.exports.getTags = getTags;

async function getSituacao(req, res, next) {
  try {
    const rows = await item_dominio.findSituacao();

    onSuccess(res, rows);
  } catch (error) {
    onBadRequest(res, error.message);
  }
}

module.exports.getSituacao = getSituacao;
