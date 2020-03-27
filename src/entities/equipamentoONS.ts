import { Column, Entity, OneToMany } from 'typeorm'
import { EquipamentoPgi } from './equipamentoPgi'

@Entity('SAU_EQUIPAMENTO_ONS')
export class EquipamentoONS {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_EQUIPAMENTO'
  })
  public CD_EQUIPAMENTO: number

  @Column('number', {
    nullable: false,
    name: 'CD_FAMILIA'
  })
  public CD_FAMILIA: number

  @Column('varchar2', {
    nullable: true,
    length: 400,
    name: 'NM_EQUIPAMENTO'
  })
  public NM_EQUIPAMENTO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_EQUIPAMENTO'
  })
  public DS_EQUIPAMENTO: string | null

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
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_INATIVAR'
  })
  public FL_INATIVAR: number | null

  @Column('number', {
    nullable: true,
    name: 'CD_FAMILIA_ONS'
  })
  public CD_FAMILIA_ONS: number | null

  @Column('number', {
    nullable: true,
    name: 'CD_INSTALACAO_ONS'
  })
  public CD_INSTALACAO_ONS: number | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null

  @OneToMany(
    () => EquipamentoPgi,
    (SAU_EQUIPAMENTO_PGI: EquipamentoPgi) => SAU_EQUIPAMENTO_PGI.cdEquipamento
  )
  public sauEquipamentoPgis: EquipamentoPgi[]
}
