import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { GrupoRestricao } from '../entities/grupoRestricao'
import { Usina } from '../entities/usina'

export interface ISauGrupoRestricaoRepository {
  getRestricoesByUsina(cdUsina: number): Promise<GrupoRestricao[]>
}

@injectable()
export class SauGrupoRestricaoRepository implements ISauGrupoRestricaoRepository {
  private readonly repository: Repository<GrupoRestricao>

  constructor() {
    this.repository = getRepository(GrupoRestricao)
  }

  public getRestricoesByUsina(cdUsina: number): Promise<GrupoRestricao[]> {
    if (!cdUsina) {
      return Promise.resolve([])
    }
    return this.repository
      .createQueryBuilder('res')
      .leftJoinAndSelect('res.idGrupo', 'idGrupo')
      .leftJoinAndSelect('res.idTipoRestricao', 'idTipoRestricao')
      .leftJoinAndSelect(Usina, 'usina', 'usina.ID_GRUPO_HIDRO_SIMULADOR_PP = idGrupo.CD_ITEM_LOOKUP')
      .where('LOWER(usina.SG_USINA) = LOWER(:CD_USINA)', { CD_USINA: cdUsina })
      .getMany()
  }
}
