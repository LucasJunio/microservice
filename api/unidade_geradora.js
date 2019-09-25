const unidade_geradora = require("../core/unidade_geradora.js");

async function get(req, res, next) {
  try {
    const context = {};
    context.id = req.query.usina;
    const rows = await unidade_geradora.find(context);

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.get = get;
