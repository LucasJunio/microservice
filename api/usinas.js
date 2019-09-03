const usinas = require("../core/usinas.js");

async function get(req, res, next) {
  try {
    const context = {};

    const rows = await usinas.find(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;
