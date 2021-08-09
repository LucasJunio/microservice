import axios from 'axios'
import { logger } from './logger'

export const FluxoService = {
  URL: `http://${process.env.SAU_GATEWAY_HOST}/notification/api/v1/fluxo/send`
}

export const AuthService = {
  URL: `http://${process.env.SAU_GATEWAY_HOST}/auth/api/usuario/`
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

export { apiFluxo, getUsuario }
