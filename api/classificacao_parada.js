const classificacao_parada = require("../core/classificacao_parada");

async function getClassificacao(req, res, next) {
  try {
    const context = {};
    context.sg_usina = req.query.usina;
    const rows = await classificacao_parada.findClassificacao(context);

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getClassificacao = getClassificacao;
