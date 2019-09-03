const rg_tipo = require("../core/tipo.js");

async function getTipoParada(req, res, next) {
  try {
    const rows = await rg_tipo.findTipoParada();

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.getTipoParada = getTipoParada;

async function getMotivoReprogramacao(req, res, next) {
  try {
    const rows = await rg_tipo.findMotivoReprogramacao();

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.getMotivoReprogramacao = getMotivoReprogramacao;
