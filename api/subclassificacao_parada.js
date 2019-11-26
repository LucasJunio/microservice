const {onBadRequest, onSuccess} = require("../utils/handlers");

const subclassificacao_parada = require("../core/subclassificacao_parada.js");

async function getSubClassificacao(req, res, next) {
  try {
    const context = {};
    context.sg_usina = req.query.usina;
    context.cd_classificacao_parada = req.query.classificacao;

    const rows = await subclassificacao_parada.findSubClassificacao(context);

    onSuccess(res, rows);
  } catch (error) {
    onBadRequest(res, error.message);
  }
}

module.exports.getSubClassificacao = getSubClassificacao;
