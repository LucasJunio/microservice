const param_programacao_paradas = require("../core/param_programacao_paradas.js");

async function get(req, res, next) {
  try {
    const context = {};
    context.data_inicio_programacao = req.query.data_inicio_programacao;
    console.log(req.query.data_inicio_programacao);

    const rows = await param_programacao_paradas.find(context);

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.get = get;

async function getNroAnosParadaLongoPrazo(req, res, next) {
  try {
    const rows = await param_programacao_paradas.findNroAnosParadaLongoPrazo();

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getNroAnosParadaLongoPrazo = getNroAnosParadaLongoPrazo;
