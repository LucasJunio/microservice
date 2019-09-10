const database = require("../utils/database.js");

const queryFindLastIdParada = `SELECT CD_PARADA FROM SAU_PROGRAMACAO_PARADA ORDER BY CD_PROGRAMACAO_PARADA DESC FETCH NEXT 1 ROWS ONLY`;

async function findLastIdParada() {
  console.log(queryFindLastIdParada);
  const result = await database.simpleExecute(queryFindLastIdParada);
  return result.rows;
}
module.exports.findLastIdParada = findLastIdParada;

async function updateCancelamento(context) {
  let query = "";
  let result = "";

  if (context.id_programacao_parada) {
    query += `\nUPDATE SAU_PROGRAMACAO_PARADA SET DT_CANCELAMENTO = TO_DATE('${context.dt_cancelamento}', 'yyyy-mm-dd hh24:mi:ss'), DS_MOTIVO_CANCELAMENTO = '${context.ds_motivo_cancelamento}', ID_STATUS_CANCELAMENTO = '${context.id_status_cancelamento}'`;
    query += `\nWHERE CD_PARADA = ${context.id_programacao_parada}`;
    console.log(query);

    result = await database.simpleExecute(query);
  }
  return result.rowsAffected;
}

module.exports.updateCancelamento = updateCancelamento;

const queryInsert = `
  INSERT INTO SAU_PROGRAMACAO_PARADA (
    CD_PROGRAMACAO_PARADA,
    CD_PARADA,
    CD_SEQ_PARADA,
    CD_USINA,
    SG_USINA,
    DT_CRIACAO_PARADA,
    ID_TIPO_PARADA,
    ID_STATUS,
    DT_HORA_INICIO_PROGRAMACAO,
    DT_HORA_TERMINO_PROGRAMACAO,
    ID_TIPO_PROGRAMACAO,
    NM_AREA_ORIGEM,
    CD_CLASSIFICACAO_PROGR_PARADA,
    CD_SUBCLASSIF_PROGR_PARADA,
    DS_SUBCLASSIF_PROGR_PARADA,
    DS_DESCRICAO_PROGR_PARADA,
    DS_OBSERVACAO,
    DT_HORA_INICIO_SERVICO,
    DT_HORA_TERMINO_SERVICO,
    DS_SERVICO_EXECUTADO,
    DS_NUM_CEL_ANEEL,
    FL_COMUNICAR_ANEEL,
    DT_CANCELAMENTO,
    DS_MOTIVO_CANCELAMENTO,
    ID_STATUS_CANCELAMENTO,
    NM_AREA_ORIGEM_CANCELAMENTO,
    DT_HORA_INICIO_REPROGRAMACAO,
    DT_HORA_TERMINO_REPROGRAMACAO,
    ID_STATUS_REPROGRAMACAO,
    ID_ORIGEM_REPROGRAMACAO,
    ID_MOTIVO_REPROGRAMACAO,
    DS_HISTORICO_PROGR_PARADA,
    CD_CLASSIF_REPROGR_PARADA,
    CD_SUBCLAS_REPROGR_PARADA,
    DS_SUBCLAS_REPROGR_PARADA,
    DS_NOVA_DESCRICAO_PROGR_PARADA,
    DS_OBSERVACAO_REPROGR_PARADA,
    NM_AREA_ORIGEM_REPROGRAMACAO,
    CD_USUARIO_CONCLUSAO,
    DT_CONCLUSAO,
    CD_USUARIO_CANCELAMENTO,
    ID_STATUS_PROGRAMACAO,
    ID_ATUAL,
    FL_REINICIAR_FLUXO,
    DS_LOG_STATUS
  ) VALUES (
    SAU_PARADA_S.nextval,
    :CD_PARADA,
    :CD_SEQ_PARADA,
    :CD_USINA,
    :SG_USINA,
    TO_DATE(:DT_CRIACAO_PARADA, 'yyyy-mm-dd hh24:mi:ss'),
    :ID_TIPO_PARADA,
    :ID_STATUS,
    TO_DATE(:DT_HORA_INICIO_PROGRAMACAO, 'yyyy-mm-dd hh24:mi:ss'),
    TO_DATE(:DT_HORA_TERMINO_PROGRAMACAO, 'yyyy-mm-dd hh24:mi:ss'),
    :ID_TIPO_PROGRAMACAO,
    :NM_AREA_ORIGEM,
    :CD_CLASSIFICACAO_PROGR_PARADA,
    :CD_SUBCLASSIF_PROGR_PARADA,
    :DS_SUBCLASSIF_PROGR_PARADA,
    :DS_DESCRICAO_PROGR_PARADA,
    :DS_OBSERVACAO,
    TO_DATE(:DT_HORA_INICIO_SERVICO, 'yyyy-mm-dd hh24:mi:ss'),
    TO_DATE(:DT_HORA_TERMINO_SERVICO, 'yyyy-mm-dd hh24:mi:ss'),
    :DS_SERVICO_EXECUTADO,
    :DS_NUM_CEL_ANEEL,
    :FL_COMUNICAR_ANEEL,
    :DT_CANCELAMENTO,
    :DS_MOTIVO_CANCELAMENTO,
    :ID_STATUS_CANCELAMENTO,
    :NM_AREA_ORIGEM_CANCELAMENTO,
    TO_DATE(:DT_HORA_INICIO_REPROGRAMACAO, 'yyyy-mm-dd hh24:mi:ss'),
    TO_DATE(:DT_HORA_TERMINO_REPROGRAMACAO, 'yyyy-mm-dd hh24:mi:ss'),
    :ID_STATUS_REPROGRAMACAO,
    :ID_ORIGEM_REPROGRAMACAO,
    :ID_MOTIVO_REPROGRAMACAO,
    :DS_HISTORICO_PROGR_PARADA,
    :CD_CLASSIF_REPROGR_PARADA,
    :CD_SUBCLAS_REPROGR_PARADA,
    :DS_SUBCLAS_REPROGR_PARADA,
    :DS_NOVA_DESCRICAO_PROGR_PARADA,
    :DS_OBSERVACAO_REPROGR_PARADA,
    :NM_AREA_ORIGEM_REPROGRAMACAO,
    :CD_USUARIO_CONCLUSAO,
    :DT_CONCLUSAO,
    :CD_USUARIO_CANCELAMENTO,
    :ID_STATUS_PROGRAMACAO,
    :ID_ATUAL,
    :FL_REINICIAR_FLUXO,
    :DS_LOG_STATUS
  )
`;

async function create(emp) {
  const paradaProgramada = Object.assign({}, emp);
  const result = await database.simpleExecute(queryInsert, paradaProgramada);
  console.log(result);

  return result.rowsAffected;
}

module.exports.create = create;
