const classificacao_parada = require("../core/classificacao_parada");

async function getClassificacao(req, res, next) {
  try {
    const context = {};
    context.sg_usina = req.query.usina;
    const rows = await classificacao_parada.findClassificacao(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.getClassificacao = getClassificacao;

async function getNovaClassificacao(req, res, next) {
  try {
    const rows = await classificacao_parada.findNovaClassificacao();

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.getNovaClassificacao = getNovaClassificacao;
