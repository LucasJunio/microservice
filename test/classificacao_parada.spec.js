const chai = require("chai");
const http = require("chai-http");
const subSet = require("chai-subset");

const classificacao_parada = require("../api/classificacao_parada");

chai.use(http);
chai.use(subSet);

const schema = {
  CD_CLASSIFICACAO_PARADA: cd => cd,
  DS_CLASSIFICACAO_PARADA: ds => ds
};

const schemaNovaClassificacao = {
  COD_CLASSIF_PARADA_UNIDADE: cd => cd,
  DESCR_CLASSIF_PARADA_UNIDADE: descr => descr
};

describe("Testes de integração - Classificação Parada", () => {
  it("/parada_programada/classificacao_parada - GET", () => {
    chai
      .request(classificacao_parada.getClassificacao)
      .get("/api/parada_programada/classificacao_parada")
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.containSubset([schema]);
        done();
      });
  });

  it("/parada_programada/classificacao_parada - GET com id usina", () => {
    chai
      .request(classificacao_parada.getClassificacao)
      .get("/api/parada_programada/classificacao_parada")
      .query("usina=ECLA")
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.containSubset([schema]);
        done();
      });
  });

  it("/parada_programada/nova_classificacao_parada - GET", () => {
    chai
      .request(classificacao_parada.getNovaClassificacao)
      .get("/api/parada_programada/nova_classificacao_parada")
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.containSubset([schemaNovaClassificacao]);
        done();
      });
  });
});
