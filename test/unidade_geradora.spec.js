const chai = require("chai");
const http = require("chai-http");
const subSet = require("chai-subset");

const app = "http://localhost:4000";

chai.use(http);
chai.use(subSet);

const schema = {
  CD_ITEM_DOMINIO: cd => cd,
  DS_ITEM_DOMINIO: ds => ds
};

describe("Testes de integração - Unidade Geradora", () => {
  it("/unidade_geradora - GET", async () => {
    const response = await chai.request(app).get("/api/unidade_geradora");

    chai.expect(response.status).to.be.equals(200);
    chai.expect(response.body).to.containSubset([schema]);
  });

  it("/unidade_geradora - GET com id da usina", async () => {
    const response = await chai
      .request(app)
      .get("/api/unidade_geradora")
      .query("usina=ECLA");

    chai.expect(response.status).to.be.equals(200);
    chai.expect(response.body).to.containSubset([schema]);
  });
});
