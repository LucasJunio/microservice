const chai = require("chai");
const http = require("chai-http");
const subSet = require("chai-subset");

const subclassificacao_parada = require("../api/subclassificacao_parada");

chai.use(http);
chai.use(subSet);

const schema = {
  CD_SUBCLASSIFICACAO_PARADA: cd => cd,
  DS_SUBCLASSIFICACAO_PARADA: ds => ds
};

describe("Testes de integração - Subclassificacao Parada", () => {
  it("/parada_programada/sub_classificacao_parada - GET", () => {
    chai
      .request(subclassificacao_parada.getSubClassificacao)
      .get("/api/parada_programada/sub_classificacao_parada")
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.containSubset([schema]);
        done();
      });
  });
});
