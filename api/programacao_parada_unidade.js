const programacao_parada_unidade = require("../core/programacao_parada_unidade.js");
const programacao_parada = require("../core/programacao_parada");

async function post(req, res, next) {
  try {
    let paradaUnidade;
    const list_unidade_geradora = req.body.list_unidade_geradora;

    for (const unidadeGeradora of list_unidade_geradora) {
      const cd_unidade_geradora = unidadeGeradora.value;

      let cd_parada = await programacao_parada.findLastIdParada();
      cd_parada = cd_parada.length === 0 ? 1 : cd_parada[0].CD_PARADA + 1;

      let cd_programacao_parada = await programacao_parada.create({
        ...req.body.obj_parada,
        CD_PARADA: cd_parada
      });

      cd_programacao_parada = cd_programacao_parada.id;

      body = {
        CD_PARADA_UNIDADE: cd_parada,
        CD_PROGRAMACAO_PARADA: cd_programacao_parada,
        CD_UNIDADE_GERADORA: cd_unidade_geradora
      };

      paradaUnidade = await programacao_parada_unidade.create(body);
    }

    res.status(201).json(paradaUnidade);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports.post = post;
