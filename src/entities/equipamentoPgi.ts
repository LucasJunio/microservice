import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { Pgi } from './pgi'
import { FamiliaONS } from './familiaONS'
import { InstalacaoONS } from './instalacaoONS'
import { EquipamentoONS } from './equipamentoONS'
import { TemLookup } from './temLookup'
import { AgenteOns } from './agenteOns'
import { AtividadeONS } from './atividadeONS'

@Entity('SAU_EQUIPAMENTO_PGI')
@Index('SAU_EQUIPAMENTO_PGI_IX1', ['cdLocal'])
@Index('SAU_EQUIPAMENTO_PGI_IX2', ['cdEquipamento'])
export class EquipamentoPgi {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_EQUIPAMENTO_PGI'
  })
  public CD_EQUIPAMENTO_PGI: number

  @ManyToOne(
    () => Pgi,
    (SAU_PGI: Pgi) => SAU_PGI.sauEquipamentoPgis,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_PGI' })
  public cdPgi: Pgi | null

  @Column('varchar2', {
    nullable: false,
    length: 20,
    name: 'SG_AGENTE_ONS'
  })
  public SG_AGENTE_ONS: string

  @ManyToOne(
    () => FamiliaONS,
    (SAU_FAMILIA_ONS: FamiliaONS) => SAU_FAMILIA_ONS.sauEquipamentoPgis,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_FAMILIA_ONS' })
  public cdFamiliaOns: FamiliaONS | null

  @ManyToOne(
    () => InstalacaoONS,
    (SAU_INSTALACAO_ONS: InstalacaoONS) => SAU_INSTALACAO_ONS.sauEquipamentoPgis,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_INSTALACAO_ONS' })
  public cdInstalacaoOns: InstalacaoONS | null

  @ManyToOne(
    () => EquipamentoONS,
    (SAU_EQUIPAMENTO_ONS: EquipamentoONS) => SAU_EQUIPAMENTO_ONS.sauEquipamentoPgis,
    {}
  )
  @JoinColumn({ name: 'CD_EQUIPAMENTO' })
  public cdEquipamento: EquipamentoONS | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_GERAL_EQUIPAMENTO'
  })
  public DS_GERAL_EQUIPAMENTO: string | null

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauEquipamentoPgis,
    {}
  )
  @JoinColumn({ name: 'CD_LOCAL' })
  public cdLocal: TemLookup | null

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

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauEquipamentoPgis2,
    {}
  )
  @JoinColumn({ name: 'ID_UNIDADE_MEDIDA' })
  public idUnidadeMedida: TemLookup | null

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
    name: 'VL_RESTRICAO_GERACAO'
  })
  public VL_RESTRICAO_GERACAO: number | null

  @ManyToOne(
    () => AgenteOns,
    (SAU_AGENTE_ONS: AgenteOns) => SAU_AGENTE_ONS.sauEquipamentoPgis,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_AGENTE_ONS' })
  public cdAgenteOns: AgenteOns | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null

  @ManyToOne(
    () => AtividadeONS,
    (SAU_ATIVIDADE_ONS: AtividadeONS) => SAU_ATIVIDADE_ONS.sauEquipamentoPgis,
    {}
  )
  @JoinColumn({ name: 'CD_ATIVIDADE_ONS' })
  public cdAtividadeOns: AtividadeONS | null
}
