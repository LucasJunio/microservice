import { injectable } from 'inversify'
import { Repository, getRepository, EntityRepository } from 'typeorm'
import { ProgramacaoParadaUG } from '../entities/programacaoParadaUG'

export interface ISauProgramacaoParadaUgRepository {
  saveProgramacaoParadaUgLote(programacaoParadaUgs: ProgramacaoParadaUG[]): Promise<ProgramacaoParadaUG[]>
  deleteAllPpUgByCdParada(cdProgramacaoParada: number): Promise<any>
}

@injectable()
@EntityRepository(ProgramacaoParadaUG)
export class SauProgramacaoParadaUgRepository implements ISauProgramacaoParadaUgRepository {
  public readonly sauProgramacaoParadaUg: Repository<ProgramacaoParadaUG>

  constructor() {
    this.sauProgramacaoParadaUg = getRepository(ProgramacaoParadaUG)
  }

  public async saveProgramacaoParadaUgLote(
    programacaoParadaUgs: ProgramacaoParadaUG[]
  ): Promise<ProgramacaoParadaUG[]> {
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
