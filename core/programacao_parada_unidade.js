const database = require("../utils/database.js");

const queryInsert = `
INSERT INTO SAU_PROGRAMACAO_PARADA_UNIDADE (
	CD_PARADA_UNIDADE,
	CD_PROGRAMACAO_PARADA,
	CD_UNIDADE_GERADORA
) VALUES (
	:CD_PARADA_UNIDADE,
	:CD_PROGRAMACAO_PARADA,
	:CD_UNIDADE_GERADORA
)
`;

async function create(emp) {
  const paradaUnidade = Object.assign({}, emp);

  const result = await database.simpleExecute(queryInsert, paradaUnidade);

  console.log(result);

  return result;
}

module.exports.create = create;
