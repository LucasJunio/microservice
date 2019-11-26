const {onBadRequest, onSuccess} = require("../utils/handlers");

const usinas = require("../core/usinas.js");

async function get(req, res, next) {
  try {
    const context = {};

    const rows = await usinas.find(context);

    onSuccess(res, rows);
  } catch (error) {
    onBadRequest(res, error.message);
  }
}

module.exports.get = get;
