const chai = require("chai");
const http = require("chai-http");
const subSet = require("chai-subset");

const app = "http://localhost:4000";

chai.use(http);
chai.use(subSet);

const schema = {
  CD_SUBCLASSIFICACAO_PARADA: cd => cd,
  DS_SUBCLASSIFICACAO_PARADA: ds => ds
};

describe("subclassificao_parada", () => {
  describe("GET /parada_programada/sub_classificacao_parada", () => {
    it("Deve retornar cd_subclassificacao e ds_subclassificacao", async () => {
      const response = await chai
        .request(app)
        .get("/api/parada_programada/sub_classificacao_parada");

      chai.expect(response.status).to.be.equals(200);
      chai.expect(response.body).to.containSubset([schema]);
    });
  });
});
