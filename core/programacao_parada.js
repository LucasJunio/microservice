const database = require("../utils/database.js");
const queryFindLastIdParada = `SELECT CD_PARADA CD_ITEM_DOMINIO FROM SAU_PROGRAMACAO_PARADA ORDER BY CD_PARADA DESC, CD_PROGRAMACAO_PARADA DESC FETCH NEXT 1 ROWS ONLY`;

async function findLastIdParada() {
  const result = await database.simpleExecute(queryFindLastIdParada);
  return result.rows;
}
module.exports.findLastIdParada = findLastIdParada;

const queryFindIdSeq = `SELECT cd_seq_parada CD_ITEM_DOMINIO FROM SAU_PROGRAMACAO_PARADA`;

async function findLastIdSeq(context) {
  let query = "";
  if (context.cd_parada) {
    query += queryFindIdSeq;
    query += `\nWHERE cd_parada = ${context.cd_parada} ORDER BY cd_seq_parada DESC FETCH NEXT 1 ROWS ONLY`;
    result = await database.simpleExecute(query);
  }
  console.log(query);

  return result.rows;
}
module.exports.findLastIdSeq = findLastIdSeq;

let queryInsertBase = `INSERT INTO SAU_PROGRAMACAO_PARADA (
  CD_PROGRAMACAO_PARADA,
  CD_PARADA,
  CD_SEQ_PARADA,
  CD_USINA,
  DT_CRIACAO_PARADA,
  ID_TIPO_PARADA,
  ID_STATUS,
  DT_HORA_INICIO_PROGRAMACAO,
  DT_HORA_TERMINO_PROGRAMACAO,
  ID_TIPO_PROGRAMACAO,
  NM_AREA_ORIGEM,
  CD_CLASSIFICACAO_PROGR_PARADA,
  CD_SUBCLASSIF_PROGR_PARADA,
  DS_PROGRAMACAO_PARADA,
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
  DS_MOTIVO_REPROGRAMACAO,
  CD_CLASSIF_REPROGR_PARADA,
  CD_SUBCLAS_REPROGR_PARADA,
  DS_NOVA_DESCRICAO_PROGR_PARADA,
  DS_OBSERVACAO_REPROGR_PARADA,
  NM_AREA_ORIGEM_REPROGRAMACAO,
  CD_USUARIO_CONCLUSAO,
  DT_CONCLUSAO,
  CD_USUARIO_CANCELAMENTO,
  ID_STATUS_PROGRAMACAO,
  ID_ATUAL,
  FL_REINICIAR_FLUXO,
  DS_LOG_STATUS,
  USER_CREATE,
  DATE_CREATE,
  USER_UPDATE,
  DATE_UPDATE,
  NR_REPROGRAMACOES_APROVADAS,
  CD_UNIDADE_GERADORA,
  ID_CONJUNTO_USINA,
  VERSION
)`;

async function updateCancelamento(context) {
  let query = "";
  let result = "";

  if (context.id_programacao_parada && context.dt_cancelamento && context.ds_motivo_cancelamento) {
    query = queryInsertBase;
    query += `\n SELECT SAU_PARADA_S.nextval,
    CD_PARADA,
    CD_SEQ_PARADA+1 as CD_SEQ_PARADA,
    CD_USINA,
    DT_CRIACAO_PARADA,
    ID_TIPO_PARADA,
    ${context.status} as ID_STATUS,
    DT_HORA_INICIO_PROGRAMACAO,
    DT_HORA_TERMINO_PROGRAMACAO,
    ID_TIPO_PROGRAMACAO,
    NM_AREA_ORIGEM,
    CD_CLASSIFICACAO_PROGR_PARADA,
    CD_SUBCLASSIF_PROGR_PARADA,
    DS_PROGRAMACAO_PARADA,
    DS_OBSERVACAO,
    DT_HORA_INICIO_SERVICO,
    DT_HORA_TERMINO_SERVICO,
    DS_SERVICO_EXECUTADO,
    DS_NUM_CEL_ANEEL,
    FL_COMUNICAR_ANEEL,
    TO_DATE('${context.dt_cancelamento}', 'yyyy-mm-dd hh24:mi:ss') as DT_CANCELAMENTO,
    '${context.ds_motivo_cancelamento}' as DS_MOTIVO_CANCELAMENTO,
    ${context.status} as ID_STATUS_CANCELAMENTO,,
    NM_AREA_ORIGEM_CANCELAMENTO,
    DT_HORA_INICIO_REPROGRAMACAO,
    DT_HORA_TERMINO_REPROGRAMACAO,
    ID_STATUS_REPROGRAMACAO,
    ID_ORIGEM_REPROGRAMACAO,
    ID_MOTIVO_REPROGRAMACAO,
    DS_MOTIVO_REPROGRAMACAO,
    CD_CLASSIF_REPROGR_PARADA,
    CD_SUBCLAS_REPROGR_PARADA,
    DS_NOVA_DESCRICAO_PROGR_PARADA,
    DS_OBSERVACAO_REPROGR_PARADA,
    NM_AREA_ORIGEM_REPROGRAMACAO,
    CD_USUARIO_CONCLUSAO,
    DT_CONCLUSAO,
    CD_USUARIO_CANCELAMENTO,
    ID_STATUS_PROGRAMACAO,
    ID_ATUAL,
    FL_REINICIAR_FLUXO,
    DS_LOG_STATUS,
    USER_CREATE,
    DATE_CREATE,
    USER_UPDATE,
    TO_CHAR(SYSDATE, 'dd/mm/yyyy') as DATE_UPDATE,
    NR_REPROGRAMACOES_APROVADAS,
    CD_UNIDADE_GERADORA,
    ID_CONJUNTO_USINA,
    VERSION from SAU_PROGRAMACAO_PARADA where cd_parada = ${context.id_programacao_parada} and cd_seq_parada = 
    (select * from (SELECT cd_seq_parada from SAU_PROGRAMACAO_PARADA where cd_parada = ${context.id_programacao_parada}  order by cd_seq_parada DESC  )where rownum = 1)
    `;
    console.log(query);

    result = await database.simpleExecute(query);
  }
  return result.rowsAffected;
}

module.exports.updateCancelamento = updateCancelamento;

async function updateStatus(context) {
  let query = "";
  let result = "";
  console.log(context);

  if (context.id_programacao_parada && context.status) {
    query = queryInsertBase;
    query += `\n SELECT SAU_PARADA_S.nextval,
    CD_PARADA,
    CD_SEQ_PARADA+1 as CD_SEQ_PARADA,
    CD_USINA,
    DT_CRIACAO_PARADA,
    ID_TIPO_PARADA,
    ${context.status} as ID_STATUS,
    DT_HORA_INICIO_PROGRAMACAO,
    DT_HORA_TERMINO_PROGRAMACAO,
    ID_TIPO_PROGRAMACAO,
    NM_AREA_ORIGEM,
    CD_CLASSIFICACAO_PROGR_PARADA,
    CD_SUBCLASSIF_PROGR_PARADA,
    DS_PROGRAMACAO_PARADA,
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
    DS_MOTIVO_REPROGRAMACAO,
    CD_CLASSIF_REPROGR_PARADA,
    CD_SUBCLAS_REPROGR_PARADA,
    DS_NOVA_DESCRICAO_PROGR_PARADA,
    DS_OBSERVACAO_REPROGR_PARADA,
    NM_AREA_ORIGEM_REPROGRAMACAO,
    CD_USUARIO_CONCLUSAO,
    DT_CONCLUSAO,
    CD_USUARIO_CANCELAMENTO,
    ID_STATUS_PROGRAMACAO,
    ID_ATUAL,
    FL_REINICIAR_FLUXO,
    DS_LOG_STATUS,
    USER_CREATE,
    DATE_CREATE,
    USER_UPDATE,
    DATE_UPDATE,
    NR_REPROGRAMACOES_APROVADAS,
    CD_UNIDADE_GERADORA,
    ID_CONJUNTO_USINA,
    VERSION from SAU_PROGRAMACAO_PARADA where cd_parada = ${context.id_programacao_parada} and cd_seq_parada = 
    (select * from (SELECT cd_seq_parada from SAU_PROGRAMACAO_PARADA where cd_parada = ${context.id_programacao_parada}  order by cd_seq_parada DESC  )where rownum = 1)
    `;

    console.log("abc");

    result = await database.simpleExecute(query);
    console.log(result);
    console.log("aaaasdasdasd");
  }
  return result.rowsAffected;
}

module.exports.updateStatus = updateStatus;

async function updateReprogramacao(context) {
  let query = "";
  let result = "";
  console.log(context);
  console.log(context.cd_parada);
  console.log(context.dt_inicio_reprogramacao);
  console.log(context.dt_termino_reprogramacao);
  if (context.cd_parada && context.dt_inicio_reprogramacao && context.dt_termino_reprogramacao) {
    query = queryInsertBase;
    query += `\n SELECT SAU_PARADA_S.nextval,
    CD_PARADA,
    CD_SEQ_PARADA+1 as CD_SEQ_PARADA,
    CD_USINA,
    DT_CRIACAO_PARADA,
    ID_TIPO_PARADA,
    '${context.status}' as ID_STATUS,
    DT_HORA_INICIO_PROGRAMACAO,
    DT_HORA_TERMINO_PROGRAMACAO,
    ID_TIPO_PROGRAMACAO,
    NM_AREA_ORIGEM,
    CD_CLASSIFICACAO_PROGR_PARADA,
    CD_SUBCLASSIF_PROGR_PARADA,
    DS_PROGRAMACAO_PARADA,
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
    TO_DATE('${context.dt_inicio_reprogramacao}', 'yyyy-mm-dd hh24:mi:ss') as DT_HORA_INICIO_REPROGRAMACAO,
    TO_DATE('${context.dt_termino_reprogramacao}', 'yyyy-mm-dd hh24:mi:ss') as DT_HORA_TERMINO_REPROGRAMACAO,
    '${context.status}' as ID_STATUS_REPROGRAMACAO,`;
    query += context.id_origem_reprogramacao ? `'${context.id_origem_reprogramacao}' as ID_ORIGEM_REPROGRAMACAO,` : "ID_ORIGEM_REPROGRAMACAO,";
    query += context.id_motivo_reprogramacao ? `'${context.id_motivo_reprogramacao}' as ID_MOTIVO_REPROGRAMACAO,` : "ID_MOTIVO_REPROGRAMACAO,";
    query += context.ds_motivo_reprogramacao ? `'${context.ds_motivo_reprogramacao}' as DS_MOTIVO_REPROGRAMACAO,` : "DS_MOTIVO_REPROGRAMACAO,";
    query += context.cd_classificacao ? `'${context.cd_classificacao}' as CD_CLASSIF_REPROGR_PARADA,` : "CD_CLASSIF_REPROGR_PARADA,";
    query += context.cd_subclassificacao ? `'${context.cd_subclassificacao}' as CD_SUBCLAS_REPROGR_PARADA,` : "CD_SUBCLAS_REPROGR_PARADA,";
    query += context.ds_nova_descricao ? `'${context.ds_nova_descricao}' as DS_NOVA_DESCRICAO_PROGR_PARADA,` : "DS_NOVA_DESCRICAO_PROGR_PARADA,";
    query += context.ds_observacao ? `'${context.ds_observacao}' as DS_OBSERVACAO_REPROGR_PARADA,` : "DS_OBSERVACAO_REPROGR_PARADA,";
    query += `
    NM_AREA_ORIGEM_REPROGRAMACAO,
    CD_USUARIO_CONCLUSAO,
    DT_CONCLUSAO,
    CD_USUARIO_CANCELAMENTO,
    ID_STATUS_PROGRAMACAO,
    ID_ATUAL,
    FL_REINICIAR_FLUXO,
    DS_LOG_STATUS,
    USER_CREATE,
    DATE_CREATE,
    USER_UPDATE,
    DATE_UPDATE,
    NR_REPROGRAMACOES_APROVADAS+1 as NR_REPROGRAMACOES_APROVADAS,
    CD_UNIDADE_GERADORA,
    ID_CONJUNTO_USINA,
    VERSION from SAU_PROGRAMACAO_PARADA where cd_parada = ${context.cd_parada} and cd_seq_parada = 
    (select * from (SELECT cd_seq_parada from SAU_PROGRAMACAO_PARADA where cd_parada = ${context.cd_parada}  order by cd_seq_parada DESC  )where rownum = 1)
    `;

    console.log(query);

    result = await database.simpleExecute(query);
    console.log(result);
    console.log("aaaasdasdasd");
  }
  return result.rowsAffected;
}

module.exports.updateReprogramacao = updateReprogramacao;

const queryInsert =
  queryInsertBase +
  `
  VALUES (
    SAU_PARADA_S.nextval,
    :CD_PARADA,
    :CD_SEQ_PARADA,
    :CD_USINA,
    TO_DATE(:DT_CRIACAO_PARADA, 'yyyy-mm-dd hh24:mi:ss'),
    :ID_TIPO_PARADA,
    :ID_STATUS,
    TO_DATE(:DT_HORA_INICIO_PROGRAMACAO, 'yyyy-mm-dd hh24:mi:ss'),
    TO_DATE(:DT_HORA_TERMINO_PROGRAMACAO, 'yyyy-mm-dd hh24:mi:ss'),
    :ID_TIPO_PROGRAMACAO,
    :NM_AREA_ORIGEM,
    :CD_CLASSIFICACAO_PROGR_PARADA,
    :CD_SUBCLASSIF_PROGR_PARADA,
    :DS_PROGRAMACAO_PARADA,
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
    :DS_MOTIVO_REPROGRAMACAO,
    :CD_CLASSIF_REPROGR_PARADA,
    :CD_SUBCLAS_REPROGR_PARADA,
    :DS_NOVA_DESCRICAO_PROGR_PARADA,
    :DS_OBSERVACAO_REPROGR_PARADA,
    :NM_AREA_ORIGEM_REPROGRAMACAO,
    :CD_USUARIO_CONCLUSAO,
    :DT_CONCLUSAO,
    :CD_USUARIO_CANCELAMENTO,
    :ID_STATUS_PROGRAMACAO,
    :ID_ATUAL,
    :FL_REINICIAR_FLUXO,
    :DS_LOG_STATUS,
    :USER_CREATE,
    :DATE_CREATE,
    :USER_UPDATE,
    :DATE_UPDATE,
    :NR_REPROGRAMACOES_APROVADAS,
    :CD_UNIDADE_GERADORA,
    :ID_CONJUNTO_USINA,
    :VERSION
  )
`;

async function create(emp) {
  if (emp.CD_PARADA && emp.CD_SEQ_PARADA && emp.CD_USINA && emp.DT_HORA_INICIO_PROGRAMACAO && emp.DT_HORA_TERMINO_PROGRAMACAO && emp.CD_CLASSIFICACAO_PROGR_PARADA && emp.CD_UNIDADE_GERADORA) {
    const paradaProgramada = Object.assign({}, emp);
    const result = await database.simpleExecute(queryInsert, paradaProgramada);

    return result;
  } else {
    return false;
  }
}

module.exports.create = create;

const queryFindAll = `
SELECT SIDS.DS_ITEM_DOMINIO AS STATUS,
SIDTP.DS_ITEM_DOMINIO AS TIPO_PARADA, 
SPP.CD_PARADA as CD_PARADA,
SPP.DT_HORA_INICIO_PROGRAMACAO as DT_HORA_INICIO_PROGRAMACAO , 
SPP.DT_HORA_TERMINO_PROGRAMACAO as DT_HORA_TERMINO_PROGRAMACAO, 
SPP.DS_PROGRAMACAO_PARADA as DS_PROGRAMACAO_PARADA
FROM SAU_PROGRAMACAO_PARADA SPP
INNER JOIN SAU_ITEM_DOMINIO SIDTP ON (SPP.ID_TIPO_PARADA = SIDTP.CD_ITEM_DOMINIO )
INNER JOIN SAU_ITEM_DOMINIO SIDS ON (SPP.ID_STATUS = SIDS.CD_ITEM_DOMINIO)`;

async function findAll(context) {
  let query = queryFindAll;
  if (context.length !== 0) {
    context.forEach((element, index) => {
      index === 0 ? (query += `\n WHERE ${element}`) : (query += `\nAND ${element}`);
    });
    query += " AND SPP.CD_SEQ_PARADA = (select max(CD_SEQ_PARADA) from SAU_PROGRAMACAO_PARADA where CD_PARADA= SPP.CD_PARADA)";
  } else {
    query += " WHERE SPP.CD_SEQ_PARADA = (select max(CD_SEQ_PARADA) from SAU_PROGRAMACAO_PARADA where CD_PARADA= SPP.CD_PARADA)";
  }
  query += "\nORDER BY SPP.CD_PARADA DESC, SPP.CD_SEQ_PARADA DESC";
  console.log(query);

  const result = await database.simpleExecute(query);

  return result;
}

module.exports.findAll = findAll;

async function findById(context) {
  let query = `(SELECT * FROM (SELECT * FROM SAU_PROGRAMACAO_PARADA WHERE CD_PARADA =${context.id}  ORDER BY cd_seq_parada DESC) WHERE rownum = 1)`;
  console.log(query);
  const result = await database.simpleExecute(query);
  return result;
}

module.exports.findById = findById;
