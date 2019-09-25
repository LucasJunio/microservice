const chai = require("chai");
const http = require("chai-http");
const subSet = require("chai-subset");

const app = "http://localhost:4000";

chai.use(http);
chai.use(subSet);

const schemaParam = {
  DT_FINAL_PARADAS_ANUAIS: dtAnuais => dtAnuais,
  DT_FINAL_PARADAS_PROGRAMADA: dtPrograma => dtPrograma,
  NR_PRAZO_PARADA_URGENTE: nro => nro
};

const schema = {
  NR_ANOS_PARADA_LONGO_PRAZO: nro => nro
};

describe("Testes de integração - Param Programação Paradas", () => {
  it("/parada_programada/param_programacao_paradas - GET", async () => {
    const response = await chai
      .request(app)
      .get("/api/parada_programada/param_programacao_paradas")
      .query("data_inicio_programacao=10/10/2019");

    chai.expect(response.status).to.be.equals(200);
    chai.expect(response.body.length).to.be.equals(1);
    chai.expect(response.body).to.containSubset([schemaParam]);
  });

  it("/parada_programada/nro_anos_parada_longo_prazo - GET", async () => {
    const response = await chai
      .request(app)
      .get("/api/parada_programada/nro_anos_parada_longo_prazo");

    chai.expect(response.status).to.be.equals(200);
    chai.expect(response.body.length).to.be.equals(1);
    chai.expect(response.body).to.containSubset([schema]);
  });
});
