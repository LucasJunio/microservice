const pgi = require("../core/pgi.js");

async function getNumPGI(req, res, next) {
  try {
    const context = {};
    context.cd_parada = req.query.id_parada;
    const rows = await pgi.getNumPGI(context);

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports.getNumPGI = getNumPGI;
