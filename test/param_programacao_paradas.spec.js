const chai = require("chai");
const http = require("chai-http");
const subSet = require("chai-subset");

const param_programacao_paradas = require("../api/param_programacao_paradas");

chai.use(http);
chai.use(subSet);

const schemaParam = {
  DT_FINAL_PARADAS_ANUAIS: dtAnuais => dtAnuais,
  DT_FINAL_PARADAS_PROGRAMADA: dtPrograma => dtPrograma,
  NR_PRAZO_PARADA_URGENTE: nro => nro
};

const schema = {
  NR_ANOS_PARADA_LONGO_PRAZO: nro => nro
};

describe("Testes de integração - Param Programação Paradas", () => {
  it("/parada_programada/param_programacao_paradas - GET", () => {
    chai
      .request(param_programacao_paradas.get)
      .get("/api/parada_programada/param_programacao_paradas")
      .query("data_inicio_programacao=10/09/2019")
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.containSubset([schemaParam]);
        done();
      });
  });

  it("/parada_programada/nro_anos_parada_longo_prazo - GET", () => {
    chai
      .request(param_programacao_paradas.getNroAnosParadaLongoPrazo)
      .get("/api/parada_programada/nro_anos_parada_longo_prazo")
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body.length).to.be.equal(1);
        chai.expect(res.body).to.containSubset([schema]);
        done();
      });
  });
});
