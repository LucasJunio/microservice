import { Column, Entity, OneToMany } from 'typeorm'
import { SAU_EQUIPAMENTO_PGI } from './SAU_EQUIPAMENTO_PGI'

@Entity('SAU_FAMILIA_ONS')
export class SAU_FAMILIA_ONS {
  @Column('number', {
    nullable: false,
    unique: true,
    name: 'CD_FAMILIA'
  })
  public CD_FAMILIA: number

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_FAMILIA'
  })
  public DS_FAMILIA: string | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_ATIVO'
  })
  public FL_ATIVO: number | null

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
    nullable: false,
    primary: true,
    name: 'CD_FAMILIA_ONS'
  })
  public CD_FAMILIA_ONS: number

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null

  @OneToMany(
    () => SAU_EQUIPAMENTO_PGI,
    (SAU_EQUIPAMENTO_PGI: SAU_EQUIPAMENTO_PGI) => SAU_EQUIPAMENTO_PGI.cdFamiliaOns
  )
  public sauEquipamentoPgis: SAU_EQUIPAMENTO_PGI[]
}
