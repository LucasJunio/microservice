const item_dominio = require("../core/item_dominio.js");

async function getTipoParada(req, res, next) {
  try {
    const rows = await item_dominio.findTipoParada();

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.getTipoParada = getTipoParada;

async function getMotivoReprogramacao(req, res, next) {
  try {
    const rows = await item_dominio.findMotivoReprogramacao();

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.getMotivoReprogramacao = getMotivoReprogramacao;

async function getStatusParada(req, res, next) {
  try {
    const rows = await item_dominio.findStatusParada();

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.getStatusParada = getStatusParada;
