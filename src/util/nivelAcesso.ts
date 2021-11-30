import { getNivelAcessoUsuario } from './api'

const obterItensNiveisAcesso = async (authorization: string, nivelAcesso?: string) => {
  try {
    const response = await getNivelAcessoUsuario(authorization)

    if (nivelAcesso) {
      return response.data.filter(item => item.nivelAcesso === nivelAcesso)
    }

    return response.data
  } catch (error) {
    // throw new HttpError({
    //   statusCode: 503,
    //   description: 'Erro no serviço de nível de acesso',
    //   message: 'Houve um erro na requisição ao serviço de nível de acesso',
    //   details: error,
    // });
  }
}

const contemItemNivelAcesso = async (
  nivelAcesso: string, itemNivelAcesso: string, authorization: string
) => {
  let itensNiveisAcesso = await obterItensNiveisAcesso(authorization)

  itensNiveisAcesso = itensNiveisAcesso.filter(
    item => item.nivelAcesso === nivelAcesso
  );

  for (const item of itensNiveisAcesso) {
    if (item.itemNivelAcesso === itemNivelAcesso) {
      return true
    }
  }

  return false
}

const validaManutencaoUsina = async (siglaUsina: string, authorization: string) => {
  if (
    !(await contemItemNivelAcesso('USINA', siglaUsina, authorization))
  ) {
    //   throw new HttpError({
    //     statusCode: 403,
    //     description: 'Usuário não possui item de nível de acesso',
    //     message: `O usuário '${this.usuario}' não possui o item de nível de acesso '${siglaUsina}' no nível de acesso 'USINA'`,
    //   });
  }
}

const validaAcessoUsina = async (siglaUsina: string, authorization: string) => {
  if (await contemItemNivelAcesso('USINARESTRITA', 'S', authorization)) {
    await validaManutencaoUsina(siglaUsina, authorization)
  }
}

const obterAcessoUsinas = async (authorization: string) => {
  return await (await obterItensNiveisAcesso(authorization, 'USINA')).map(item => item.itemNivelAcesso)
}

export { validaManutencaoUsina, validaAcessoUsina, obterItensNiveisAcesso, contemItemNivelAcesso, obterAcessoUsinas }