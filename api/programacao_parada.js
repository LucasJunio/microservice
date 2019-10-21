const programacao_parada = require("../core/programacao_parada.js");

async function getLastIdParada(req, res, next) {
  try {
    const rows = await programacao_parada.findLastIdParada();

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getLastIdParada = getLastIdParada;

async function getLastIdSeq(req, res, next) {
  try {
    const context = {};
    context.cd_parada = req.query.id_parada;
    const rows = await programacao_parada.findLastIdSeq(context);

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.getLastIdSeq = getLastIdSeq;

async function putCancelamento(req, res, next) {
  try {
    const rows = await programacao_parada.updateCancelamento(req.body);

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.putCancelamento = putCancelamento;

async function putReprogramacao(req, res, next) {
  try {
    const rows = await programacao_parada.updateReprogramacao(req.body);

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.putReprogramacao = putReprogramacao;

async function post(req, res, next) {
  try {
    const { form, unidadesGeradoras } = req.body.data;
    let rows;

    for (const unidadeGeradora of unidadesGeradoras) {
      const cd_unidade_geradora = unidadeGeradora.CD_ITEM_DOMINIO;

      let cd_parada = await programacao_parada.findLastIdParada();
      cd_parada = cd_parada.length === 0 ? 1 : cd_parada[0].CD_ITEM_DOMINIO + 1;

      rows = await programacao_parada.create({
        ...form,
        CD_PARADA: cd_parada,
        CD_UNIDADE_GERADORA: cd_unidade_geradora
      });

      if (!rows) {
        res.status(400).json("Erro ao salvar");
        return;
      }
      console.log(rows);
    }

    res.status(201).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports.post = post;
