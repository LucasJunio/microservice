import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { SAU_AGENTE_ONS } from './SAU_AGENTE_ONS'
import { SAU_PGI_AI } from './SAU_PGI_AI'

@Entity('SAU_EMAIL_AGENTE_ONS')
export class SAU_EMAIL_AGENTE_ONS {
  @Column('number', {
    nullable: false,
    primary: true,
    precision: 10,
    scale: 0,
    name: 'CD_EMAIL'
  })
  public CD_EMAIL: number

  @ManyToOne(
    () => SAU_AGENTE_ONS,
    (SAU_AGENTE_ONS: SAU_AGENTE_ONS) => SAU_AGENTE_ONS.sauEmailAgenteOnss,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_AGENTE_ONS' })
  public cdAgenteOns: SAU_AGENTE_ONS | null

  @Column('varchar2', {
    nullable: false,
    length: 100,
    name: 'DS_EMAIL'
  })
  public DS_EMAIL: string

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

  @Column('varchar2', {
    nullable: false,
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
    () => SAU_PGI_AI,
    (SAU_PGI_AI: SAU_PGI_AI) => SAU_PGI_AI.cdEmailPara
  )
  public sauPgiAis: SAU_PGI_AI[]
}
