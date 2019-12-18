import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId
} from 'typeorm'
import { SAU_PGI } from './SAU_PGI'

@Entity('SAU_PRORROGACAO_PGI')
export class SAU_PRORROGACAO_PGI {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_PRORROGACAO_PGI'
  })
  public CD_PRORROGACAO_PGI: number

  @ManyToOne(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.sauProrrogacaoPgis,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_PGI' })
  public cdPgi: SAU_PGI | null

  @Column('varchar2', {
    nullable: true,
    name: 'NM_DESPACHANTE_AGENTE'
  })
  public NM_DESPACHANTE_AGENTE: string | null

  @Column('varchar2', {
    nullable: true,
    name: 'NM_RESPONSAVEL'
  })
  public NM_RESPONSAVEL: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_USINA'
  })
  public NM_OPERADOR_USINA: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    unique: true,
    name: 'DT_PRORROGADA'
  })
  public DT_PRORROGADA: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_MOTIVO_PRORROGACAO'
  })
  public DS_MOTIVO_PRORROGACAO: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DATE_CREATE'
  })
  public DATE_CREATE: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'USER_CREATE'
  })
  public USER_CREATE: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DATE_UPDATE'
  })
  public DATE_UPDATE: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'USER_UPDATE'
  })
  public USER_UPDATE: string | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null
}
