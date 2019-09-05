const chai = require("chai");
const http = require("chai-http");
const subSet = require("chai-subset");

const usinas = require("../api/usinas");

chai.use(http);
chai.use(subSet);

const schema = {
  DS_ITEM_DOMINIO: ds => ds,
  CD_ITEM_DOMINIO: cd => cd
};

describe("Testes de integração - Usinas", () => {
  it("/usinas - GET", () => {
    chai
      .request(usinas.get)
      .get("/api/usinas")
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.containSubset([schema]);
        done();
      });
  });
});
