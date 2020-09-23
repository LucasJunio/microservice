import { Response, Request, NextFunction } from 'express'
import Handlers from '../core/handlers'
import { SauProgramacaoParadaRepository } from '../repositories/sauProgramacaoParadaRepository'

const CheckVersionPP = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { CD_PROGRAMACAO_PARADA, VERSION } = req.body
  let savedPpVersion = -1
  const repository = new SauProgramacaoParadaRepository()

  if (CD_PROGRAMACAO_PARADA) {
    savedPpVersion = await repository.getPpVersion(CD_PROGRAMACAO_PARADA)
  }

  if (CD_PROGRAMACAO_PARADA && VERSION < savedPpVersion) {
    const error = new Error('Document VERSION is different')
    Handlers.conflict(res, error.message)
    return
  }

  next()
}

const CheckVersionPPReproExclu = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { cdPp, version } = req.body
  let savedPpVersion = -1
  const repository = new SauProgramacaoParadaRepository()

  if (cdPp) {
    savedPpVersion = await repository.getPpVersion(cdPp)
  }

  if (cdPp && version < savedPpVersion) {
    const error = new Error('Document VERSION is different')
    Handlers.conflict(res, error.message)
    return
  }

  await repository.addVersion(cdPp, version)

  next()
}

export { CheckVersionPP, CheckVersionPPReproExclu }
