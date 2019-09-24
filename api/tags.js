const tags = require("../core/tags.js");

async function get(req, res, next) {
  try {
    const rows = await tags.findTags();

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;
