const {onBadRequest, onSuccess} = require("../utils/handlers");

const unidade_geradora = require("../core/unidade_geradora.js");

async function get(req, res, next) {
  try {
    const context = {};
    context.id = req.query.usina;
    const rows = await unidade_geradora.find(context);

    onSuccess(res, rows);
  } catch (error) {
    onBadRequest(res, error.message);
  }
}

module.exports.get = get;
