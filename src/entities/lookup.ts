import { Column, Entity, OneToMany } from 'typeorm'
import { TemLookup } from './temLookup'

@Entity('SAU_LOOKUP')
export class Lookup {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_LOOKUP'
  })
  public CD_LOOKUP: number

  @Column('varchar2', {
    nullable: false,
    unique: true,
    length: 30,
    name: 'ID_LOOKUP'
  })
  public ID_LOOKUP: string

  @Column('varchar2', {
    nullable: false,
    length: 100,
    name: 'DS_LOOKUP'
  })
  public DS_LOOKUP: string

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'USER_CREATE'
  })
  public USER_CREATE: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DATE_CREATE'
  })
  public DATE_CREATE: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'USER_UPDATE'
  })
  public USER_UPDATE: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DATE_UPDATE'
  })
  public DATE_UPDATE: Date | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null

  @OneToMany(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.cdLookup
  )
  public sauItemLookups: TemLookup[]
}
