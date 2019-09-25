const item_dominio = require("../core/item_dominio.js");

async function getTipoParada(req, res, next) {
  try {
    const context = {};

    context.targetDate = req.query.dt_inicio_programacao;
    context.refDate = req.query.dt_ref_mapa;
    context.annualDate = req.query.dtFinalParadasAnuais;
    context.scheduledDate = req.query.dtFinalParadasProgramada;
    context.urgentDeadline = req.query.nrPrazoParadaUrgente;
    context.years = req.query.anosParadaLongoPrazo;

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

async function getStatusParada(req, res, next) {
  try {
    const rows = await item_dominio.findStatusParada();

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getStatusParada = getStatusParada;

async function getTags(req, res, next) {
  try {
    const rows = await item_dominio.findTags();

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getTags = getTags;
