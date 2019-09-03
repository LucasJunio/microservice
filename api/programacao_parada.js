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
