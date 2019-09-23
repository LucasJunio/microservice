const programacao_parada = require("../core/programacao_parada.js");

async function getLastIdParada(req, res, next) {
  try {
    const rows = await programacao_parada.findLastIdParada();

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.getLastIdParada = getLastIdParada;

async function getLastIdSeq(req, res, next) {
  try {
    const context = {};
    context.cd_parada = req.query.id_parada;
    const rows = await programacao_parada.findLastIdSeq(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.getLastIdSeq = getLastIdSeq;

async function putCancelamento(req, res, next) {
  try {
    const rows = await programacao_parada.updateCancelamento(req.body);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.putCancelamento = putCancelamento;

async function putReprogramacao(req, res, next) {
  try {
    const rows = await programacao_parada.updateReprogramação(req.body);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.putReprogramacao = putReprogramacao;

async function post(req, res, next) {
  try {
    const list_unidade_geradora = req.body.list_unidade_geradora;
    let id = { cd: [] };

    for (const unidadeGeradora of list_unidade_geradora) {
      const cd_unidade_geradora = unidadeGeradora.value;

      let cd_parada = await programacao_parada.findLastIdParada();
      cd_parada = cd_parada.length === 0 ? 1 : cd_parada[0].CD_PARADA + 1;

      await programacao_parada.create({
        ...req.body.obj_parada,
        CD_PARADA: cd_parada,
        CD_UNIDADE_GERADORA: cd_unidade_geradora
      });

      id = { cd: [...id.cd, cd_parada] };
    }

    res.status(201).json(id);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports.post = post;
