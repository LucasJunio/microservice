import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { SAU_ITEM_LOOKUP } from '../entities/SAU_ITEM_LOOKUP'

export interface ISauItemLookUpRepository {
  getItemLookUpByIdLookup(idLookup: string): Promise<SAU_ITEM_LOOKUP[]>
}

@injectable()
export class SauItemLookUpRepository implements ISauItemLookUpRepository {
  private readonly sauItemLookUpRepository: Repository<SAU_ITEM_LOOKUP>

  constructor() {
    this.sauItemLookUpRepository = getRepository(SAU_ITEM_LOOKUP)
  }

  // MOTIVO_REPROG_PARADA STATUS_PROG_PARADA SITUACAO_PROG_PARADA
  public getItemLookUpByIdLookup(idLookup: string): Promise<SAU_ITEM_LOOKUP[]> {
    return this.sauItemLookUpRepository.find({
      select: ['ID_ITEM_LOOKUP', 'DS_ITEM_LOOKUP', 'CD_ITEM_LOOKUP'],
      where: {
        cdLookup: {
          ID_LOOKUP: idLookup
        }
      },
      order: {
        DS_ITEM_LOOKUP: 'ASC'
      }
    })
  }
}
