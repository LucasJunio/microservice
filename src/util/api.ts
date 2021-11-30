import axios from 'axios'
import { logger } from './logger'

export const FluxoService = {
  URL: `http://${process.env.SAU_GATEWAY_HOST}/notification/api/v1/fluxo/send`
}

export const AuthService = {
  URL: `http://${process.env.SAU_GATEWAY_HOST}/auth/api/usuario/`
}

export const NivelAcessoService = {
  URL: `http://${process.env.SAU_NIVEL_ACESSO_API}/nivel-acesso/usuario-logado/`
}

const apiAuth = auth =>
  axios.create({
    baseURL: AuthService.URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth
    }
  })

const apiFluxo = auth =>
  axios.create({
    baseURL: FluxoService.URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth
    }
  })

const apiNivelAcesso = auth =>
  axios.create({
    baseURL: NivelAcessoService.URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + auth
    }
  })

const getNivelAcessoUsuario = async (authorization: string) => {
  try {
    const response = await apiNivelAcesso(authorization).get(`/`)
    return response.data
  } catch (error) {
    logger.error(error)
    return null
  }
}

const getUsuario = async (cdUsuario: string, authorization: string) => {
  if (!cdUsuario) {
    return null
  }

  try {
    const response = await apiAuth(authorization).get(`/${cdUsuario}`)
    return response.data
  } catch (error) {
    logger.error(error)
    return null
  }
}

export { apiFluxo, getUsuario, getNivelAcessoUsuario }
