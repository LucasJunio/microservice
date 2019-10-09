const historico = require("../core/historico.js");

async function getHistorico(req, res, next) {
  try {
    const rows = await historico.find();

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getHistorico = getHistorico;
