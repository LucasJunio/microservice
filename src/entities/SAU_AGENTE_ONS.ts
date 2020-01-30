import { Column, Entity, OneToMany } from 'typeorm'
import { SAU_EMAIL_AGENTE_ONS } from './SAU_EMAIL_AGENTE_ONS'
import { SAU_EQUIPAMENTO_PGI } from './SAU_EQUIPAMENTO_PGI'
import { SAU_PGI } from './SAU_PGI'

@Entity('SAU_AGENTE_ONS')
export class SAU_AGENTE_ONS {
  @Column('varchar2', {
    nullable: true,
    length: 50,
    name: 'NM_CURTO'
  })
  public NM_CURTO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 200,
    name: 'NM_LONGO'
  })
  public NM_LONGO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'LOGIN'
  })
  public LOGIN: string | null

  @Column('varchar2', {
    nullable: true,
    length: 200,
    name: 'SENHA'
  })
  public SENHA: string | null

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
    name: 'CD_AGENTE_ONS'
  })
  public CD_AGENTE_ONS: number

  @Column('varchar2', {
    nullable: false,
    unique: true,
    length: 20,
    name: 'SG_AGENTE'
  })
  public SG_AGENTE: string

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null

  @OneToMany(
    () => SAU_EMAIL_AGENTE_ONS,
    (SAU_EMAIL_AGENTE_ONS: SAU_EMAIL_AGENTE_ONS) => SAU_EMAIL_AGENTE_ONS.cdAgenteOns
  )
  public sauEmailAgenteOnss: SAU_EMAIL_AGENTE_ONS[]

  @OneToMany(
    () => SAU_EQUIPAMENTO_PGI,
    (SAU_EQUIPAMENTO_PGI: SAU_EQUIPAMENTO_PGI) => SAU_EQUIPAMENTO_PGI.cdAgenteOns
  )
  public sauEquipamentoPgis: SAU_EQUIPAMENTO_PGI[]

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.cdAgenteResp
  )
  public sauPgis: SAU_PGI[]

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.cdAgenteSolic
  )
  public sauPgis2: SAU_PGI[]
}
