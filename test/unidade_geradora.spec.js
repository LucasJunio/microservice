const chai = require("chai");
const http = require("chai-http");
const subSet = require("chai-subset");

const unidade_geradora = require("../api/unidade_geradora");

chai.use(http);
chai.use(subSet);

const schema = {
  UNIDADE_GERADORA: ug => ug
};

describe("Testes de integração - Unidade Geradora", () => {
  it("/unidade_geradora - GET", () => {
    chai
      .request(unidade_geradora.get)
      .get("/api/unidade_geradora")
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.containSubset([schema]);
        done();
      });
  });

  it("/unidade_geradora - GET com id da usina", () => {
    chai
      .request(unidade_geradora.get)
      .get("/api/unidade_geradora")
      .query("usina=ECLA")
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.containSubset([schema]);
        done();
      });
  });
});
