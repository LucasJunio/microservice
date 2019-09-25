const chai = require("chai");
const http = require("chai-http");
const subSet = require("chai-subset");

const app = "http://localhost:4000";

chai.use(http);
chai.use(subSet);

const schema = {
  DS_ITEM_DOMINIO: ds => ds,
  CD_ITEM_DOMINIO: cd => cd
};

describe("Testes de integração - Usinas", () => {
  it("/usinas - GET", async () => {
    const response = await chai.request(app).get("/api/usinas");

    chai.expect(response.status).to.be.equals(200);
    chai.expect(response.body).to.containSubset([schema]);
  });
});
