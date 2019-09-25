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

describe("unidade_geradora", () => {
  describe("GET /unidade_geradora", () => {
    it("Deve retornar cd e sg da unidade geradora", async () => {
      const response = await chai.request(app).get("/api/unidade_geradora");

      chai.expect(response.status).to.be.equals(200);
      chai.expect(response.body.length).to.not.be.equals(0);
      chai.expect(response.body).to.containSubset([schema]);
    });

    it("Deve retornar cd e sg da unidade geradora com sg da usina", async () => {
      const response = await chai
        .request(app)
        .get("/api/unidade_geradora")
        .query("usina=ECLA");

      chai.expect(response.status).to.be.equals(200);
      chai.expect(response.body.length).to.not.be.equals(0);
      chai.expect(response.body).to.containSubset([schema]);
    });
  });
});
