const chai = require("chai");
const http = require("chai-http");
const subSet = require("chai-subset");

const app = "http://localhost:4000";

chai.use(http);
chai.use(subSet);

const schema = {
  CD_CLASSIFICACAO_PARADA: cd => cd,
  DS_CLASSIFICACAO_PARADA: ds => ds
};

describe("Testes de integração - Classificação Parada", () => {
  it("/parada_programada/classificacao_parada - GET", async () => {
    const response = await chai
      .request(app)
      .get("/api/parada_programada/classificacao_parada");

    chai.expect(response.status).to.be.equals(200);
    chai.expect(response.body.length).to.not.be.equals(0);
    chai.expect(response.body).to.containSubset([schema]);
  });

  it("/parada_programada/classificacao_parada - GET com id usina", async () => {
    const response = await chai
      .request(app)
      .get("/api/parada_programada/classificacao_parada")
      .query("usina=ECLA");

    chai.expect(response.status).to.be.equals(200);
    chai.expect(response.body.length).not.to.be.equals(0);
    chai.expect(response.body).to.containSubset([schema]);
  });
});
