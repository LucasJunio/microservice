import { getNivelAcessoUsuario } from './api'

const obterItensNiveisAcesso = async (authorization: string, nivelAcesso?: string) => {
  try {
    const response = await getNivelAcessoUsuario(authorization)

    console.log('response nivel acesso')
    console.log(response)

    if (nivelAcesso) {
      return response?.filter(item => item.nivelAcesso === nivelAcesso)
    }

    return response
  } catch (error) {
    throw new Error('Houve um erro na requisição ao serviço de nível de acesso.')
  }
}

const contemItemNivelAcesso = async (nivelAcesso: string, itemNivelAcesso: string, authorization: string) => {
  let itensNiveisAcesso = await obterItensNiveisAcesso(authorization)

  itensNiveisAcesso = itensNiveisAcesso.filter(item => item.nivelAcesso === nivelAcesso)

  for (const item of itensNiveisAcesso) {
    if (item.itemNivelAcesso === itemNivelAcesso) {
      return true
    }
  }

  return false
}

const validaManutencaoUsina = async (siglaUsina: string, authorization: string) => {
  if (!(await contemItemNivelAcesso('USINA', siglaUsina, authorization))) {
    throw new Error(`O usuário não possui o item de nível de acesso '${siglaUsina}' no nível de acesso 'USINA'`)
  }
}

const validaAcessoUsina = async (siglaUsina: string, authorization: string) => {
  if (await contemItemNivelAcesso('USINARESTRITA', 'S', authorization)) {
    await validaManutencaoUsina(siglaUsina, authorization)
  }
}

const obterAcessoUsinas = async (authorization: string) => {
  return (await obterItensNiveisAcesso(authorization, 'USINA'))?.map(item => item.itemNivelAcesso)
}

export { validaManutencaoUsina, validaAcessoUsina, obterItensNiveisAcesso, contemItemNivelAcesso, obterAcessoUsinas }
