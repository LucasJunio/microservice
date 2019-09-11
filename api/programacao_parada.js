const parada_programada = require("../core/programacao_parada.js");

async function getLastIdParada(req, res, next) {
  try {
    const rows = await parada_programada.findLastIdParada();

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.getLastIdParada = getLastIdParada;

async function putCancelamento(req, res, next) {
  try {
    const rows = await parada_programada.updateCancelamento(req.body);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.putCancelamento = putCancelamento;

async function putReprogramacao(req, res, next) {
  try {
    const rows = await parada_programada.updateReprogramação(req.body);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.putReprogramacao = putReprogramacao;

async function post(req, res, next) {
  try {
    const paradaProgramada = await parada_programada.create(req.body);

    res.status(201).json(paradaProgramada);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports.post = post;
