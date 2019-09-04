const chai = require("chai");
const http = require("chai-http");
const subSet = require("chai-subset");

const item_dominio = require("../api/item_dominio");

chai.use(http);
chai.use(subSet);

const schema = {
  DS_ITEM_DOMINIO: ds => ds,
  CD_ITEM_DOMINIO: cd => cd
};

describe("Testes de integração - item dominio", () => {
  it("/parada_programada/tipo_parada - GET", () => {
    chai
      .request(item_dominio.getTipoParada)
      .get("/api/parada_programada/tipo_parada")
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.containSubset([schema]);
        done();
      });
  });

  it("/parada_programada/motivo_reprogramacao - GET", () => {
    chai
      .request(item_dominio.getMotivoReprogramacao)
      .get("/api/parada_programada/motivo_reprogramacao")
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.containSubset([schema]);
        done();
      });
  });

  it("/parada_programada/status_parada - GET", () => {
    chai
      .request(item_dominio.getStatusParada)
      .get("/api/parada_programada/status_parada")
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.containSubset([schema]);
        done();
      });
  });
});
