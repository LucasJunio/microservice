const subclassificacao_parada = require("../core/subclassificacao_parada.js");

async function getSubClassificacao(req, res, next) {
  try {
    const context = {};
    context.sg_usina = req.query.usina;
    context.cd_classificacao_parada = req.query.classificacao;

    const rows = await subclassificacao_parada.findSubClassificacao(context);

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getSubClassificacao = getSubClassificacao;
