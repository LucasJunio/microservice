import { injectable } from 'inversify'
import { Repository, getRepository, EntityRepository } from 'typeorm'
import { SAU_PROGRAMACAO_PARADA_UG } from '../entities/SAU_PROGRAMACAO_PARADA_UG'

export interface ISauProgramacaoParadaUgRepository {
  saveProgramacaoParadaUgLote(programacaoParadaUgs: SAU_PROGRAMACAO_PARADA_UG[]): Promise<SAU_PROGRAMACAO_PARADA_UG[]>
  deleteAllPpUgByCdParada(cdProgramacaoParada: number): Promise<any>
}

@injectable()
@EntityRepository(SAU_PROGRAMACAO_PARADA_UG)
export class SauProgramacaoParadaUgRepository implements ISauProgramacaoParadaUgRepository {
  public readonly sauProgramacaoParadaUg: Repository<SAU_PROGRAMACAO_PARADA_UG>

  constructor() {
    this.sauProgramacaoParadaUg = getRepository(SAU_PROGRAMACAO_PARADA_UG)
  }

  public async saveProgramacaoParadaUgLote(
    programacaoParadaUgs: SAU_PROGRAMACAO_PARADA_UG[]
  ): Promise<SAU_PROGRAMACAO_PARADA_UG[]> {
    for (const programacaoParadaUg of programacaoParadaUgs) {
      const idUgs = await this.getUgsSeq()
      programacaoParadaUg.CD_PROGRAMACAO_PARADA_UG = idUgs[0].ID
    }

    return this.sauProgramacaoParadaUg.save(programacaoParadaUgs)
  }

  public async deleteAllPpUgByCdParada(cdProgramacaoParada: number): Promise<any> {
    return this.sauProgramacaoParadaUg
      .createQueryBuilder()
      .delete()
      .where('CD_PROGRAMACAO_PARADA = :cdProgramacaoParada', { cdProgramacaoParada })
      .execute()
  }

  public async getUgsSeq(): Promise<any> {
    return this.sauProgramacaoParadaUg.query('select SAU_PROGRAMACAO_PARADA_UG_S.nextval as id FROM DUAL')
  }
}
