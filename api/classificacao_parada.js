const classificacao_parada = require("../core/classificacao_parada");
const {onSuccess, onBadRequest} = require('./../utils/handlers');

async function getClassificacao(req, res, next) {
  try {
    const context = {};
    context.sg_usina = req.query.usina;
    const rows = await classificacao_parada.findClassificacao(context);
    onSuccess(res, rows);
  } catch (error) {
    onBadRequest(res, error.message);
  }
}

module.exports.getClassificacao = getClassificacao;
