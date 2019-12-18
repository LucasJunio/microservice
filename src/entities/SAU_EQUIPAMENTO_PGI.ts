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
import { SAU_FAMILIA_ONS } from './SAU_FAMILIA_ONS'
import { SAU_INSTALACAO_ONS } from './SAU_INSTALACAO_ONS'
import { SAU_EQUIPAMENTO_ONS } from './SAU_EQUIPAMENTO_ONS'
import { SAU_ITEM_LOOKUP } from './SAU_ITEM_LOOKUP'
import { SAU_AGENTE_ONS } from './SAU_AGENTE_ONS'
import { SAU_ATIVIDADE_ONS } from './SAU_ATIVIDADE_ONS'

@Entity('SAU_EQUIPAMENTO_PGI')
@Index('SAU_EQUIPAMENTO_PGI_IX1', ['cdLocal'])
@Index('SAU_EQUIPAMENTO_PGI_IX2', ['cdEquipamento'])
export class SAU_EQUIPAMENTO_PGI {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_EQUIPAMENTO_PGI'
  })
  public CD_EQUIPAMENTO_PGI: number

  @ManyToOne(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.sauEquipamentoPgis,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_PGI' })
  public cdPgi: SAU_PGI | null

  @Column('varchar2', {
    nullable: false,
    length: 20,
    name: 'SG_AGENTE_ONS'
  })
  public SG_AGENTE_ONS: string

  @ManyToOne(
    () => SAU_FAMILIA_ONS,
    (SAU_FAMILIA_ONS: SAU_FAMILIA_ONS) => SAU_FAMILIA_ONS.sauEquipamentoPgis,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_FAMILIA_ONS' })
  public cdFamiliaOns: SAU_FAMILIA_ONS | null

  @ManyToOne(
    () => SAU_INSTALACAO_ONS,
    (SAU_INSTALACAO_ONS: SAU_INSTALACAO_ONS) => SAU_INSTALACAO_ONS.sauEquipamentoPgis,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_INSTALACAO_ONS' })
  public cdInstalacaoOns: SAU_INSTALACAO_ONS | null

  @ManyToOne(
    () => SAU_EQUIPAMENTO_ONS,
    (SAU_EQUIPAMENTO_ONS: SAU_EQUIPAMENTO_ONS) => SAU_EQUIPAMENTO_ONS.sauEquipamentoPgis,
    {}
  )
  @JoinColumn({ name: 'CD_EQUIPAMENTO' })
  public cdEquipamento: SAU_EQUIPAMENTO_ONS | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_GERAL_EQUIPAMENTO'
  })
  public DS_GERAL_EQUIPAMENTO: string | null

  @ManyToOne(
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauEquipamentoPgis,
    {}
  )
  @JoinColumn({ name: 'CD_LOCAL' })
  public cdLocal: SAU_ITEM_LOOKUP | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_PRINCIPAL'
  })
  public FL_PRINCIPAL: number | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_INTERV_REDE_OP'
  })
  public FL_INTERV_REDE_OP: number | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_INTERV_MANUT'
  })
  public FL_INTERV_MANUT: number | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_SERV_ATIV_MANUT_PROT'
  })
  public FL_SERV_ATIV_MANUT_PROT: number | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_ATIV_MIN_MANUT'
  })
  public FL_ATIV_MIN_MANUT: number | null

  @Column('number', {
    nullable: true,
    name: 'NR_RESTRICAO_OPERATIVA'
  })
  public NR_RESTRICAO_OPERATIVA: number | null

  @Column('varchar2', {
    nullable: true,
    length: 15,
    name: 'ID_UNIDADE_MEDIDA'
  })
  public ID_UNIDADE_MEDIDA: string | null

  @Column('date', {
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

  @Column('date', {
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
    name: 'VL_RESTRICAO_GERACAO'
  })
  public VL_RESTRICAO_GERACAO: number | null

  @ManyToOne(
    () => SAU_AGENTE_ONS,
    (SAU_AGENTE_ONS: SAU_AGENTE_ONS) => SAU_AGENTE_ONS.sauEquipamentoPgis,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_AGENTE_ONS' })
  public cdAgenteOns: SAU_AGENTE_ONS | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null

  @ManyToOne(
    () => SAU_ATIVIDADE_ONS,
    (SAU_ATIVIDADE_ONS: SAU_ATIVIDADE_ONS) => SAU_ATIVIDADE_ONS.sauEquipamentoPgis,
    {}
  )
  @JoinColumn({ name: 'CD_ATIVIDADE_ONS' })
  public cdAtividadeOns: SAU_ATIVIDADE_ONS | null
}
