import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { SAU_USINA } from '../entities/SAU_USINA'

export interface ISauUsinaRepository {
  getUsinas(): Promise<SAU_USINA[]>
  getUsinaByCdAndId(cdConjuntoUsina: number, idConjuntoUsina: string): Promise<SAU_USINA>
}

@injectable()
export class SauUsinaRepository implements ISauUsinaRepository {
  private readonly sauUsinaRepository: Repository<SAU_USINA>
  private readonly query: string

  constructor() {
    this.sauUsinaRepository = getRepository(SAU_USINA)
    this.query = `SELECT sg_usina sg_conjunto_usina,
                         cd_usina cd_conjunto_usina,
                         'U'      id_conjunto_usina
                  FROM sau_usina
                  WHERE fl_ativo = 1
                  UNION
                  SELECT scu.sg_conjunto sg_conjunto_usina,
                         scu.cd_conjunto cd_conjunto_usina,
                         'C'             id_conjunto_usina
                  FROM sau_agrup_conjunto_usina acu, 
                       sau_conjunto_usina scu
                  WHERE scu.fl_ativo = 1 
                    AND acu.cd_conjunto = scu.cd_conjunto 
                  ORDER BY 1`

  }

  public getUsinas(): Promise<SAU_USINA[]> {
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

  public getUsinaByCdAndId(cdConjuntoUsina: number, idConjuntoUsina: string): Promise<SAU_USINA> {

    if(idConjuntoUsina === "U") {
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
