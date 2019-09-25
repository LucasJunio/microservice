const chai = require("chai");
const http = require("chai-http");
const subSet = require("chai-subset");

const app = "http://localhost:4000";

chai.use(http);
chai.use(subSet);

const schemaId = {
  CD_PARADA: cd => cd
};

const schemaIdSeq = {
  CD_SEQ_PARADA: cd => cd
};

const schemaPost = {
  cd: cd => [cd]
};

const dataCancelamento = {
  id_programacao_parada: 2,
  dt_cancelamento: "2019-10-10 10:50:00",
  ds_motivo_cancelamento: "teste"
};

const dataReprogramacao = {
  id_programacao_parada: 5,
  dt_inicio_reprogramacao: "2019-10-10 10:50:00",
  dt_termino_reprogramacao: "2019-10-10 10:50:00",
  id_origem_reprogramacao: "123",
  id_motivo_reprogramacao: "COM",
  cd_classificacao: 22,
  cd_subclassificacao: 253
};

let data = {
  list_unidade_geradora: [
    {
      value: 65,
      label: "ECLA01",
      id: 0
    },
    {
      value: 67,
      label: "ECLA03",
      id: 2
    },
    {
      value: 69,
      label: "ECLA05",
      id: 4
    }
  ],
  obj_parada: {
    CD_PARADA: 78,
    CD_SEQ_PARADA: 1,
    CD_USINA: 86,
    DT_CRIACAO_PARADA: "2019-09-25 08:37:00",
    ID_TIPO_PARADA: "PP",
    ID_STATUS: "RASCUNHO",
    DT_HORA_INICIO_PROGRAMACAO: "2019-10-10 10:50:00",
    DT_HORA_TERMINO_PROGRAMACAO: "2019-10-20 10:50:00",
    ID_TIPO_PROGRAMACAO: "P",
    NM_AREA_ORIGEM: "",
    CD_CLASSIFICACAO_PROGR_PARADA: 24,
    CD_SUBCLASSIF_PROGR_PARADA: 241,
    DS_SUBCLASSIF_PROGR_PARADA: "",
    DS_PROGRAMACAO_PARADA: "",
    DS_OBSERVACAO: "",
    DT_HORA_INICIO_SERVICO: "2019-10-10 10:50:00",
    DT_HORA_TERMINO_SERVICO: "2019-10-20 10:50:00",
    DS_SERVICO_EXECUTADO: "",
    DS_NUM_CEL_ANEEL: "",
    FL_COMUNICAR_ANEEL: 0,
    DT_CANCELAMENTO: null,
    DS_MOTIVO_CANCELAMENTO: "",
    ID_STATUS_CANCELAMENTO: "",
    NM_AREA_ORIGEM_CANCELAMENTO: "",
    DT_HORA_INICIO_REPROGRAMACAO: null,
    DT_HORA_TERMINO_REPROGRAMACAO: null,
    ID_STATUS_REPROGRAMACAO: "",
    ID_ORIGEM_REPROGRAMACAO: "",
    ID_MOTIVO_REPROGRAMACAO: "",
    DS_MOTIVO_REPROGRAMACAO: "",
    CD_CLASSIF_REPROGR_PARADA: "",
    CD_SUBCLAS_REPROGR_PARADA: "",
    DS_SUBCLAS_REPROGR_PARADA: "",
    DS_NOVA_DESCRICAO_PROGR_PARADA: "",
    DS_OBSERVACAO_REPROGR_PARADA: "",
    NM_AREA_ORIGEM_REPROGRAMACAO: "",
    CD_USUARIO_CONCLUSAO: "",
    DT_CONCLUSAO: "",
    CD_USUARIO_CANCELAMENTO: "",
    ID_STATUS_PROGRAMACAO: "",
    ID_ATUAL: "",
    FL_REINICIAR_FLUXO: 0,
    DS_LOG_STATUS: "",
    NR_REPROGRAMACOES_APROVADAS: 0
  }
};
describe("programação_parada", () => {
  describe("GET /parada_programada/id_parada", () => {
    it("Deve retornar cd_parada", async () => {
      const response = await chai
        .request(app)
        .get("/api/parada_programada/id_parada");

      chai.expect(response.status).to.be.equals(200);
      chai.expect(response.body.length).to.be.equals(1);
      chai.expect(response.body).to.containSubset([schemaId]);
    });
  });

  describe("GET /parada_programada/id_parada_seq", () => {
    it("Deve retornar cd_parada_seq", async () => {
      const response = await chai
        .request(app)
        .get("/api/parada_programada/id_parada_seq")
        .query("id_parada=1");

      chai.expect(response.status).to.be.equals(200);
      chai.expect(response.body.length).to.be.equals(1);
      chai.expect(response.body).to.containSubset([schemaIdSeq]);
    });
  });

  describe("PUT /parada_programada/cancelamento", () => {
    it("Deve retornar Ok ao atualizar os dados de cancelamento com id_status_cancelamento", async () => {
      const response = await chai
        .request(app)
        .put("/api/parada_programada/cancelamento")
        .send({
          ...dataCancelamento,
          id_status_cancelamento: "Em cancelamento"
        });

      chai.expect(response.status).to.be.equals(200);
      chai.expect(response.body).to.be.equals(1);
    });

    it("Deve retornar Ok ao atualizar os dados de cancelamento ", async () => {
      const response = await chai
        .request(app)
        .put("/api/parada_programada/cancelamento")
        .send({ dataCancelamento });

      chai.expect(response.status).to.be.equals(200);
    });
  });

  describe("PUT /parada_programada/reprogramacao", () => {
    it("Deve retornar Ok ao atualizar os dados de reprogramação", async () => {
      const response = await chai
        .request(app)
        .put("/api/parada_programada/reprogramacao")
        .send({ dataReprogramacao });

      chai.expect(response.status).to.be.equals(200);
    });
  });

  describe("POST /parada_programada", () => {
    it("Deve retornar status 201 e o(s) cd_parada ", async () => {
      const response = await chai
        .request(app)
        .post("/api/parada_programada")
        .send(data);

      chai.expect(response.status).to.be.equals(201);
      chai.expect(response.body).to.containSubset(schemaPost);
    });
  });
});
