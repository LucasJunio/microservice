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

describe("Testes de integração - item dominio", () => {
  it("/parada_programada/tipo_parada - GET", async () => {
    const response = await chai
      .request(app)
      .get("/api/parada_programada/tipo_parada");

    chai.expect(response.status).to.be.equals(200);
    chai.expect(response.body.length).to.not.be.equals(0);
    chai.expect(response.body).to.containSubset([schema]);
  });

  it("/parada_programada/motivo_reprogramacao - GET", async () => {
    const response = await chai
      .request(app)
      .get("/api/parada_programada/motivo_reprogramacao");

    chai.expect(response.status).to.be.equals(200);
    chai.expect(response.body.length).to.not.be.equals(0);
    chai.expect(response.body).to.containSubset([schema]);
  });

  it("/parada_programada/status_parada - GET", async () => {
    const response = await chai
      .request(app)
      .get("/api/parada_programada/status_parada");

    chai.expect(response.status).to.be.equals(200);
    chai.expect(response.body.length).to.not.be.equals(0);
    chai.expect(response.body).to.containSubset([schema]);
  });
});
