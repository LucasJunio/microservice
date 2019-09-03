const database = require("../utils/database.js");

const baseQuery = `SELECT SG_USINA DS_ITEM_DOMINIO, CD_USINA CD_ITEM_DOMINIO
FROM sau_usina 
WHERE fl_ativo = '1' AND ((SG_USINA IN (
    SELECT DISTINCT aud.autorizacao_i 
    FROM ace_usuario_dominio aud, sau_usina u
    WHERE /*aud.cd_usuario = :global.cd_usuario 
    AND */aud.id_dominio = 'USINA'
    AND aud.autorizacao_i <> 'UHFA'
    AND aud.autorizacao_i <> 'UHSG'
    AND aud.cd_sistema = 'SAU'
    AND aud.id_ativo = 1
    AND aud.autorizacao_i = u.SG_USINA
    AND u.fl_ativo = '1')
AND (
    SELECT COUNT(*)
    FROM ace_perfil_usuario
    WHERE /*cd_usuario = :global.cd_usuario
    AND */cd_grupo IN (260, 270) /*Empregados Terceirizados*/ 
    AND cd_sistema = 'SAU'
    AND id_ativo = 1) > 0)
OR (
    SELECT COUNT(*)
    FROM ace_perfil_usuario
    WHERE /*cd_usuario = :global.cd_usuario
    AND */cd_grupo IN (260, 270) /*Empregados Terceirizados*/
    AND cd_sistema = 'SAU'
    AND id_ativo = 1) = 0)
UNION SELECT DISTINCT scu.SG_CONJUNTO DS_ITEM_DOMINIO, scu.CD_CONJUNTO  CD_ITEM_DOMINIO
FROM sau_agrup_conjunto_usina acu, sau_conjunto_usina scu 
WHERE scu.fl_ativo = '1'
AND acu.cd_conjunto = scu.cd_conjunto
AND ((acu.SG_USINA IN (
    SELECT DISTINCT aud.autorizacao_i
    FROM ace_usuario_dominio aud, sau_usina u
    WHERE /*aud.cd_usuario = :global.cd_usuario 
    AND */aud.id_dominio = 'USINA'
    AND aud.autorizacao_i <> 'UHFA'
    AND aud.autorizacao_i <> 'UHSG'
    AND aud.cd_sistema = 'SAU' AND aud.id_ativo = 1
    AND aud.autorizacao_i = u.SG_USINA
    AND u.fl_ativo = '1')
AND (
    SELECT COUNT(*)
    FROM ace_perfil_usuario
    WHERE /*cd_usuario = :global.cd_usuario 
    AND */cd_grupo IN (260, 270) /*Empregados Terceirizados*/
    AND cd_sistema = 'SAU'
    AND id_ativo = 1) > 0)
OR (
    SELECT COUNT(*) 
    FROM ace_perfil_usuario
    WHERE /*cd_usuario = :global.cd_usuario
    AND */cd_grupo IN (260, 270) /*Empregados Terceirizados*/
    AND cd_sistema = 'SAU'
    AND id_ativo = 1) = 0) 
ORDER BY 1`;

async function find() {
  let query = baseQuery;
  const binds = {};

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
