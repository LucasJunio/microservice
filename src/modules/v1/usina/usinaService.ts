import { inject, injectable } from 'inversify'
import { Usina } from '../../../entities/usina'
import { TYPE } from '../../../constants/types'
import { SauUsinaRepository } from '../../../repositories/sauUsinaRepository'
import { SauItemLookUpRepository } from '../../../repositories/sauItemLookupRepository'

import { obterAcessoUsinas } from '../../../util/nivelAcesso'
import jwtDecode from 'jwt-decode'
import { isEqual } from 'lodash'

export interface IUsinaService {
  getUsinas(): Promise<Usina[]>
  getUsinasAll(authorization: string): Promise<Usina[]>
}

export interface IUser {
  usuario: string
  perfil: string
}

@injectable()
export class UsinaService implements IUsinaService {
  @inject(TYPE.SauUsinaRepository)
  private readonly sauUsinaRepository: SauUsinaRepository

  @inject(TYPE.SauItemLookUpRepository)
  private readonly sauItemLookupRepository: SauItemLookUpRepository

  public getUsinas(): Promise<Usina[]> {
    return this.sauUsinaRepository.getUsinas()
  }

  public async getUsinasAll(authorization: string): Promise<Usina[]> {
    const itemLookUp = await this.sauItemLookupRepository.getItemLookUpByIdLookupAndIdItemLookup('TIPO_USINA', 'E')

    const { perfil } = jwtDecode(authorization) as IUser

    if (isEqual(perfil, 'Empregados Terceirizados') || isEqual(perfil, 'Empregados Terceirizados - Consulta')) {
      const usinasUsuario = await obterAcessoUsinas(authorization)

      if (usinasUsuario.length === 0) {
        return []
      }

      return this.sauUsinaRepository.getUsinasAll(itemLookUp, usinasUsuario)
    }

    return this.sauUsinaRepository.getUsinasAll(itemLookUp)
  }
}
