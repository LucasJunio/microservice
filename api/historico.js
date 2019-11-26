const {onBadRequest, onSuccess} = require("../utils/handlers");

const historico = require("../core/historico.js");

async function getHistorico(req, res, next) {
  try {
    const rows = await historico.find();
    onSuccess(res, rows);
  } catch (error) {
    onBadRequest(res, error.message);
  }
}

module.exports.getHistorico = getHistorico;
