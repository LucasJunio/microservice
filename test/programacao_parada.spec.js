const chai = require("chai");
const http = require("chai-http");
const subSet = require("chai-subset");

const programacao_parada = require("../api/programacao_parada");

chai.use(http);
chai.use(subSet);

const schema = {
  CD_PARADA: cd => cd
};

const schemaPut = {
  rowsAffected: rows => rows
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
  CD_PARADA: 1,
  CD_SEQ_PARADA: 1,
  CD_USINA: 89,
  SG_USINA: "ECAA",
  DT_CRIACAO_PARADA: "2019-09-06 11:39:00",
  ID_TIPO_PARADA: "PP",
  ID_STATUS: "PPE",
  DT_HORA_INICIO_PROGRAMACAO: "2019-10-10 10:50:00",
  DT_HORA_TERMINO_PROGRAMACAO: "2019-10-20 10:50:00",
  ID_TIPO_PROGRAMACAO: "P",
  NM_AREA_ORIGEM: "",
  CD_CLASSIFICACAO_PROGR_PARADA: 25,
  CD_SUBCLASSIF_PROGR_PARADA: 0,
  DS_SUBCLASSIF_PROGR_PARADA: "",
  DS_DESCRICAO_PROGR_PARADA: "",
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
  DS_HISTORICO_PROGR_PARADA: "",
  CD_CLASSIF_REPROGR_PARADA: 0,
  CD_SUBCLAS_REPROGR_PARADA: 0,
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
  DS_LOG_STATUS: ""
};

describe("Testes de integração - Programação Parada", async () => {
  it("/parada_programada/id_parada - GET", () => {
    chai
      .request(programacao_parada.getLastIdParada)
      .get("/api/parada_programada/id_parada")
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.containSubset([schema]);
        done();
      });
  });

  it("/parada_programada/cancelamento - PUT Cancelamento", () => {
    chai
      .request(programacao_parada.putCancelamento)
      .put("/api/parada_programada/cancelamento")
      .send({ ...dataCancelamento, id_status_cancelamento: "Em cancelamento" })
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.containSubset(schemaPut);
        done();
      });
  });

  it("/parada_programada/cancelamento - PUT Cancelamento", () => {
    chai
      .request(programacao_parada.putCancelamento)
      .put("/api/parada_programada/cancelamento")
      .send({ dataCancelamento })
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.containSubset(schemaPut);
        done();
      });
  });

  it("/parada_programada/reprogramacao - PUT Reprogramação", () => {
    chai
      .request(programacao_parada.putReprogramacao)
      .put("/api/parada_programada/reprogramacao")
      .send({ dataReprogramacao })
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.containSubset(schemaPut);
        done();
      });
  });

  it("/parada_programada - POST", () => {
    let id;
    chai
      .request(programacao_parada.getLastIdParada)
      .get("/api/parada_programada/id_parada")
      .end((err, res) => {
        id = res.body.CD_PARADA;
      });

    chai
      .request(programacao_parada.post)
      .post("/api/parada_programada")
      .send({ ...data, CD_PARADA: id + 1 })
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        done();
      });
  });
});
