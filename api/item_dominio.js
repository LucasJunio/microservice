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

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getTipoParada = getTipoParada;

async function getMotivoReprogramacao(req, res, next) {
  try {
    const rows = await item_dominio.findMotivoReprogramacao();

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getMotivoReprogramacao = getMotivoReprogramacao;

async function getMotivoReprogramacaoById(req, res, next) {
  try {
    const context = {};
    context.id = req.query.id;
    const rows = await item_dominio.findMotivoReprogramacaoById(context);

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getMotivoReprogramacaoById = getMotivoReprogramacaoById;

async function getStatusParada(req, res, next) {
  try {
    const rows = await item_dominio.findStatusParada();

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getStatusParada = getStatusParada;

async function getStatusParadaById(req, res, next) {
  try {
    const context = {};
    context.id = req.query.id;
    const rows = await item_dominio.findStatusParadaById(context);

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getStatusParadaById = getStatusParadaById;

async function getTags(req, res, next) {
  try {
    const rows = await item_dominio.findTags();

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getTags = getTags;

async function getPerfil(req, res, next) {
  try {
    const rows = await item_dominio.findPerfil();

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getPerfil = getPerfil;

async function getTela(req, res, next) {
  try {
    const rows = await item_dominio.findTela();

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getTela = getTela;

async function getUsuario(req, res, next) {
  try {
    const rows = await item_dominio.findUsuario();

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getUsuario = getUsuario;

async function getDominio(req, res, next) {
  try {
    const rows = await item_dominio.findDominio();

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getDominio = getDominio;

async function getItemDominio(req, res, next) {
  try {
    const rows = await item_dominio.findItemDominio();

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getItemDominio = getItemDominio;

async function getSituacao(req, res, next) {
  try {
    const rows = await item_dominio.findSituacao();

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getSituacao = getSituacao;
