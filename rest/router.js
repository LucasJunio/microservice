const express = require("express");
const router = new express.Router();
const usinas = require("../api/usinas.js");
const unidade_geradora = require("../api/unidade_geradora.js");
const status = require("../api/status.js");
const tipo = require("../api/tipo.js");
const programacao_parada = require("../api/programacao_parada");
const param_programacao_paradas = require("../api/param_programacao_paradas");
const classificacao_parada = require("../api/classificacao_parada.js");
const subclassificacao_parada = require("../api/subclassificacao_parada.js");

router.get("/", (req, res) => {
  res.json({
    message: "Zallpy API"
  });
});
router.route("/usinas").get(usinas.get);
router.route("/unidade_geradora").get(unidade_geradora.get);
router.route("/parada_programada/tipo_parada").get(tipo.getTipoParada);
router.route("/parada_programada/status_parada").get(status.getStatusParada);
router.route("/parada_programada/classificacao_parada").get(classificacao_parada.getClassificacao);
router.route("/parada_programada/sub_classificacao_parada").get(subclassificacao_parada.getSubClassificacao);
router.route("/parada_programada/numero_parada").get(programacao_parada.getNumeroParada);
router.route("/parada_programada/motivo_reprogramacao").get(tipo.getMotivoReprogramacao);
router.route("/parada_programada/param_programacao_paradas").get(param_programacao_paradas.get);
router.route("/parada_programada/nro_anos_parada_longo_prazo").get(param_programacao_paradas.getNroAnosParadaLongoPrazo);
router.route("/parada_programada/nova_classificacao_parada").get(classificacao_parada.getNovaClassificacao);
router.route("/parada_programada/nova_sub_classificacao_parada").get(subclassificacao_parada.getSubClassificacao);

module.exports = router;
