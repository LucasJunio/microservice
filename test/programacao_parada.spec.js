const chai = require("chai");
const http = require("chai-http");
const subSet = require("chai-subset");

const programacao_parada = require("../api/programacao_parada");

chai.use(http);
chai.use(subSet);

const schema = {
  CD_SEQ_PARADA: ug => ug
};

describe("Testes de integração - Programação Parada", () => {
  it("/parada_programada/numero_parada - GET", () => {
    chai
      .request(programacao_parada.getNumeroParada)
      .get("/api/parada_programada/numero_parada")
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.containSubset([schema]);
        done();
      });
  });
});
