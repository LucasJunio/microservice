import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { Usina } from '../entities/usina'

export interface ISauUsinaRepository {
  getUsinas(): Promise<Usina[]>
  getUsinaByCdAndId(cdConjuntoUsina: number, idConjuntoUsina: string): Promise<Usina>
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
                  WHERE fl_ativo = 1
      `
  }

  public getUsinas(): Promise<Usina[]> {
    return this.sauUsinaRepository.query(this.query)

    // return this.sauUsinaRepository.find({
    //   select: ['SG_USINA', 'CD_USINA', 'ID_TIPO_USINA'],
    //   where: {
    //     FL_ATIVO: 1
    //   },
    //   order: {
    //     SG_USINA: 'ASC'
    //   }
    // })
  }

  public getUsinaByCdAndId(cdConjuntoUsina: number, idConjuntoUsina: string): Promise<Usina> {
    if (idConjuntoUsina === 'U') {
      return this.sauUsinaRepository.query(
        `SELECT sg_usina sg_conjunto_usina,
          cd_usina cd_conjunto_usina,
          'U'      id_conjunto_usina
        FROM sau_usina
        WHERE fl_ativo = 1 AND cd_usina = ${cdConjuntoUsina}
        ORDER BY 1
        `
      )
    }

    return this.sauUsinaRepository.query(
      `SELECT scu.sg_conjunto sg_conjunto_usina,
        scu.cd_conjunto cd_conjunto_usina,
        'C'             id_conjunto_usina
      FROM sau_conjunto_usina scu
      WHERE scu.fl_ativo = 1 
      AND scu.cd_conjunto = ${cdConjuntoUsina}
      ORDER BY 1`
    )
  }
}

// consulta usina antiga
//             UNION
//                   SELECT scu.sg_conjunto sg_conjunto_usina,
//                          scu.cd_conjunto cd_conjunto_usina,
//                          'C'             id_conjunto_usina,
//                          'E'             id_tipo_usina
//                   FROM sau_agrup_conjunto_usina acu,
//                        sau_conjunto_usina scu
//                   WHERE scu.fl_ativo = 1
//                     AND acu.cd_conjunto = scu.cd_conjunto
//                   ORDER BY 1
