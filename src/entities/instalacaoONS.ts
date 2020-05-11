import { Column, Entity, OneToMany } from 'typeorm'
import { EquipamentoPgi } from './equipamentoPgi'

@Entity('SAU_INSTALACAO_ONS')
export class InstalacaoONS {
  @Column('varchar2', {
    nullable: false,
    unique: true,
    length: 50,
    name: 'CD_INSTALACAO'
  })
  public CD_INSTALACAO: string

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_INSTALACAO'
  })
  public DS_INSTALACAO: string | null

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
    name: 'CD_INSTALACAO_ONS'
  })
  public CD_INSTALACAO_ONS: number

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null

  @OneToMany(
    () => EquipamentoPgi,
    (SAU_EQUIPAMENTO_PGI: EquipamentoPgi) => SAU_EQUIPAMENTO_PGI.cdInstalacaoOns
  )
  public sauEquipamentoPgis: EquipamentoPgi[]
}
