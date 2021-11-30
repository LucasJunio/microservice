import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { Usina } from '../entities/usina'
import { TemLookup } from '../entities/temLookup'

export interface ISauUsinaRepository {
  getUsinas(): Promise<Usina[]>
  getUsinaByCdAndId(cdConjuntoUsina: number, idConjuntoUsina: string): Promise<Usina>
  getUsinasAll(itemLookUp: TemLookup): Promise<Usina[]>
}

@injectable()
export class SauUsinaRepository implements ISauUsinaRepository {
  private readonly sauUsinaRepository: Repository<Usina>
  private readonly query: string

  constructor() {
    this.sauUsinaRepository = getRepository(Usina)
    this.query = `
                  SELECT sg_usina       sg_conjunto_usina,
                         cd_usina       cd_conjunto_usina,
                         'U'            id_conjunto_usina,
                         id_tipo_usina  id_tipo_usina
                  FROM sau_usina
                  ORDER BY sg_usina
                  `
  }

  public getUsinas(): Promise<Usina[]> {
    return this.sauUsinaRepository.query(this.query)
  }

  public getUsinasAll(itemLookUp, usinasUsuario?): Promise<Usina[]> {
    const { CD_ITEM_LOOKUP } = itemLookUp
    let query = `
          SELECT  su.sg_usina       sg_conjunto_usina,
                  su.cd_usina       cd_conjunto_usina,
                  'U'               id_conjunto_usina,
                  su.id_tipo_usina  id_tipo_usina
          FROM sau_usina su
            WHERE su.fl_ativo = 1
        UNION
          SELECT scu.sg_conjunto  sg_conjunto_usina,
                 scu.cd_conjunto  cd_conjunto_usina,
                 'C'              id_conjunto_usina,
                 ${CD_ITEM_LOOKUP}             id_tipo_usina
          FROM sau_conjunto_usina scu
            WHERE scu.fl_ativo = 1
          `

    if (usinasUsuario) {
      query += ` AND su.SG_USINA IN (${usinasUsuario.map(u => `'${u}'`)})`
    }

    return this.sauUsinaRepository.query(query)
  }

  public getUsinaByCdAndId(cdConjuntoUsina: number, idConjuntoUsina: string): Promise<Usina> {
    if (idConjuntoUsina === 'U') {
      return this.sauUsinaRepository.query(
        `SELECT sg_usina sg_conjunto_usina,
          cd_usina cd_conjunto_usina,
          'U'      id_conjunto_usina
        FROM sau_usina
        WHERE cd_usina = ${cdConjuntoUsina}
        ORDER BY 1
        `
      )
    }

    return this.sauUsinaRepository.query(
      `SELECT scu.sg_conjunto sg_conjunto_usina,
        scu.cd_conjunto cd_conjunto_usina,
        'C'             id_conjunto_usina
      FROM sau_conjunto_usina scu
      WHERE scu.cd_conjunto = ${cdConjuntoUsina}
      ORDER BY 1`
    )
  }
}
