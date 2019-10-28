const usinas = require("../core/usinas.js");

async function get(req, res, next) {
  try {
    const context = {};

    const rows = await usinas.find(context);

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.get = get;

async function getById(req, res, next) {
  try {
    const context = {};
    context.id = req.query.id;
    const rows = await usinas.findById(context);

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getById = getById;
