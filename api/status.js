const status = require("../core/status.js");

async function getStatusParada(req, res, next) {
  try {
    const rows = await status.findStatusParada();

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.getStatusParada = getStatusParada;
