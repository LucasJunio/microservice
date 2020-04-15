import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { AgenteOns } from './agenteOns'
import { PgiAi } from './pgiAi'

@Entity('SAU_EMAIL_AGENTE_ONS')
export class EmailAgenteONS {
  @Column('number', {
    nullable: false,
    primary: true,
    precision: 10,
    scale: 0,
    name: 'CD_EMAIL'
  })
  public CD_EMAIL: number

  @ManyToOne(
    () => AgenteOns,
    (SAU_AGENTE_ONS: AgenteOns) => SAU_AGENTE_ONS.sauEmailAgenteOnss,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_AGENTE_ONS' })
  public cdAgenteOns: AgenteOns | null

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
    () => PgiAi,
    (SAU_PGI_AI: PgiAi) => SAU_PGI_AI.cdEmailPara
  )
  public sauPgiAis: PgiAi[]
}
