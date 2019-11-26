const {onBadRequest, onSuccess} = require("../utils/handlers");

const param_programacao_paradas = require("../core/param_programacao_paradas.js");

async function get(req, res, next) {
  try {
    const context = {};
    context.data_inicio_programacao = req.query.data_inicio_programacao;

    const rows = await param_programacao_paradas.find(context);
    onSuccess(res, rows);
  } catch (error) {
    onBadRequest(res, error.message);
  }
}

module.exports.get = get;

async function getNroAnosParadaLongoPrazo(req, res, next) {
  try {
    const rows = await param_programacao_paradas.findNroAnosParadaLongoPrazo();
    onSuccess(res, rows);
  } catch (error) {
    onBadRequest(res, error.message);
  }
}

module.exports.getNroAnosParadaLongoPrazo = getNroAnosParadaLongoPrazo;
