const parada_programada = require("../core/programacao_parada.js");

async function getNumeroParada(req, res, next) {
  try {
    const rows = await parada_programada.findNumeroParada();

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.getNumeroParada = getNumeroParada;

async function post(req, res, next) {
  try {
    const paradaProgramada = await parada_programada.create(req.body);

    res.status(201).json(paradaProgramada);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;
