const express = require("express");
const router = new express.Router();
const usinas = require("../api/usinas.js");
const unidade_geradora = require("../api/unidade_geradora.js");
const item_dominio = require("../api/item_dominio.js");
const programacao_parada = require("../api/programacao_parada");
const param_programacao_paradas = require("../api/param_programacao_paradas");
const classificacao_parada = require("../api/classificacao_parada.js");
const subclassificacao_parada = require("../api/subclassificacao_parada.js");
const programacao_parada_unidade = require("../api/programacao_parada_unidade");

router.get("/", (req, res) => {
  res.json({
    message: "Zallpy API"
  });
});
router.route("/usinas").get(usinas.get);
router.route("/unidade_geradora").get(unidade_geradora.get);
router.route("/parada_programada/tipo_parada").get(item_dominio.getTipoParada);
router
  .route("/parada_programada/status_parada")
  .get(item_dominio.getStatusParada);
router
  .route("/parada_programada/classificacao_parada")
  .get(classificacao_parada.getClassificacao);
router
  .route("/parada_programada/sub_classificacao_parada")
  .get(subclassificacao_parada.getSubClassificacao);
router
  .route("/parada_programada/motivo_reprogramacao")
  .get(item_dominio.getMotivoReprogramacao);
router
  .route("/parada_programada/param_programacao_paradas")
  .get(param_programacao_paradas.get);
router
  .route("/parada_programada/nro_anos_parada_longo_prazo")
  .get(param_programacao_paradas.getNroAnosParadaLongoPrazo);
router
  .route("/parada_programada")
  .post((req, res, next) => programacao_parada.post(req, res, next));
router
  .route("/parada_programada/id_parada")
  .get(programacao_parada.getLastIdParada);
router
  .route("/parada_programada/cancelamento")
  .put(programacao_parada.putCancelamento);
router
  .route("/parada_programada/reprogramacao")
  .put(programacao_parada.putReprogramacao);
router
  .route("/parada_programada/programacao_parada_unidade")
  .post((req, res, next) => programacao_parada_unidade.post(req, res, next));

module.exports = router;
