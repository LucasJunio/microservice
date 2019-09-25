const chai = require("chai");
const http = require("chai-http");
const subSet = require("chai-subset");

const app = "http://localhost:4000";

chai.use(http);
chai.use(subSet);

const schema = {
  NUM_PGI: num => num
};

describe("pgi", () => {
  describe("GET /parada_programada/num_pgi", () => {
    it("Deve retornar o numero de pgi de acordo com cd_parada", async () => {
      const response = await chai
        .request(app)
        .get("/api/parada_programada/num_pgi")
        .query("id_parada=1");

      chai.expect(response.status).to.be.equals(200);
      chai.expect(response.body).to.containSubset([schema]);
    });
  });
});
