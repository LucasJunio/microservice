const chai = require("chai");
const http = require("chai-http");
const subSet = require("chai-subset");

const programacao_parada_unidade = require("../api/programacao_parada_unidade");

chai.use(http);
chai.use(subSet);

const data = {
  list_unidade_geradora: [
    {
      value: 147,
      label: "ECAA01",
      id: 0
    },
    {
      value: 149,
      label: "ECAA03",
      id: 2
    },
    {
      value: 151,
      label: "ECAA05",
      id: 4
    }
  ],
  obj_parada: {
    CD_SEQ_PARADA: 1,
    CD_USINA: 89,
    SG_USINA: "ECAA",
    DT_CRIACAO_PARADA: "2019-09-12 11:28:00",
    ID_TIPO_PARADA: "PA",
    ID_STATUS: "PPE",
    DT_HORA_INICIO_PROGRAMACAO: "2019-10-10 10:50:00",
    DT_HORA_TERMINO_PROGRAMACAO: "2019-10-20 10:50:00",
    ID_TIPO_PROGRAMACAO: "P",
    NM_AREA_ORIGEM: "",
    CD_CLASSIFICACAO_PROGR_PARADA: 24,
    CD_SUBCLASSIF_PROGR_PARADA: 241,
    DS_SUBCLASSIF_PROGR_PARADA: "",
    DS_DESCRICAO_PROGR_PARADA: "",
    DS_OBSERVACAO: "",
    DT_HORA_INICIO_SERVICO: "2019-10-10 10:50:00",
    DT_HORA_TERMINO_SERVICO: "2019-10-20 05:00:00",
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

describe("Testes de integração - Programação Parada Unidade", () => {
  it("/parada_programada/programacao_parada_unidade - POST", () => {
    chai
      .request(programacao_parada_unidade.post)
      .post("/api/parada_programada/programacao_parada_unidade")
      .send(data)
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        done();
      });
  });
});
