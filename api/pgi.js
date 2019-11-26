const {onBadRequest, onSuccess} = require("../utils/handlers");

const pgi = require("../core/pgi.js");

async function getNumPGI(req, res, next) {
  try {
    const context = {};
    context.cd_parada = req.query.id_parada;
    const rows = await pgi.getNumPGI(context);

    onSuccess(res, rows);
  } catch (error) {
    onBadRequest(res, error.message);
  }
}

module.exports.getNumPGI = getNumPGI;
