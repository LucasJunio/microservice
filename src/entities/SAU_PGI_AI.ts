import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { SAU_INTERVENCAO_PGI } from './SAU_INTERVENCAO_PGI'
import { SAU_ITEM_LOOKUP } from './SAU_ITEM_LOOKUP'
import { SAU_PGI_LOCAIS } from './SAU_PGI_LOCAIS'
import { SAU_AGENTE_ONS } from './SAU_AGENTE_ONS'

@Entity('SAU_PGI_AI')
@Index('SAU_PGI_AI_IX1', ['cdAgenteOns'])
@Index('SAU_PGI_AI_IX2', ['cdIntervencaoPgi'])
@Index('SAU_PGI_AI_IX3', ['CD_CONJUNTO_USINA', 'cdLocal'])
export class SAU_PGI_AI {
  @Column('number', {
    nullable: false,
    primary: true,
    precision: 10,
    scale: 0,
    name: 'CD_AI'
  })
  public CD_AI: number

  @Column('number', {
    nullable: false,
    name: 'CD_CONJUNTO_USINA'
  })
  public CD_CONJUNTO_USINA: number

  @Column('varchar2', {
    nullable: false,
    length: 1,
    name: 'ID_CONJUNTO_USINA'
  })
  public ID_CONJUNTO_USINA: string

  @Column('varchar2', {
    nullable: false,
    length: 30,
    name: 'DS_NUMERO_AI'
  })
  public DS_NUMERO_AI: string

  @Column('timestamp with local time zone', {
    nullable: false,
    name: 'DT_AI'
  })
  public DT_AI: Date

  @ManyToOne(
    () => SAU_INTERVENCAO_PGI,
    (SAU_INTERVENCAO_PGI: SAU_INTERVENCAO_PGI) => SAU_INTERVENCAO_PGI.sauPgiAis,
    {}
  )
  @JoinColumn({ name: 'CD_INTERVENCAO_PGI' })
  public cdIntervencaoPgi: SAU_INTERVENCAO_PGI | null

  @ManyToOne(
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauPgiAis,
    {}
  )
  @JoinColumn({ name: 'ID_CLASSIFICACAO_IMPEDIMENTO' })
  public idClassificacaoImpedimento: SAU_ITEM_LOOKUP | null

  @Column('varchar2', {
    nullable: true,
    length: 2000,
    name: 'DS_EQUIPAMENTO_IMPEDIR'
  })
  public DS_EQUIPAMENTO_IMPEDIR: string | null

  @ManyToOne(
    () => SAU_PGI_LOCAIS,
    (SAU_PGI_LOCAIS: SAU_PGI_LOCAIS) => SAU_PGI_LOCAIS.sauPgiAis,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_LOCAL' })
  public cdLocal: SAU_PGI_LOCAIS | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_INICIO'
  })
  public DT_INICIO: Date | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_FIM'
  })
  public DT_FIM: Date | null

  @ManyToOne(
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauPgiAis2,
    {}
  )
  @JoinColumn({ name: 'ID_PERIODICIDADE' })
  public idPeriodicidade: SAU_ITEM_LOOKUP | null

  @Column('varchar2', {
    nullable: true,
    length: 2000,
    name: 'DS_CONDICAO_IMPEDIMENTO'
  })
  public DS_CONDICAO_IMPEDIMENTO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 50,
    name: 'DS_TEMPO_MANOBRA'
  })
  public DS_TEMPO_MANOBRA: string | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_SERVICO_EXECUTAR'
  })
  public DS_SERVICO_EXECUTAR: string | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_OBSERVACAO'
  })
  public DS_OBSERVACAO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 2000,
    name: 'NM_RESPONSAVEL_SERVICO'
  })
  public NM_RESPONSAVEL_SERVICO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 1000,
    name: 'DS_DOCS_VINCULADOS'
  })
  public DS_DOCS_VINCULADOS: string | null

  @Column('varchar2', {
    nullable: true,
    length: 500,
    name: 'DS_DISPOR_EQUIPAMENTO'
  })
  public DS_DISPOR_EQUIPAMENTO: string | null

  @ManyToOne(
    () => SAU_AGENTE_ONS,
    (SAU_AGENTE_ONS: SAU_AGENTE_ONS) => SAU_AGENTE_ONS.sauPgiAis,
    {}
  )
  @JoinColumn({ name: 'CD_AGENTE_ONS' })
  public cdAgenteOns: SAU_AGENTE_ONS | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'DS_EMAIL_PARA'
  })
  public DS_EMAIL_PARA: string | null

  @Column('varchar2', {
    nullable: true,
    length: 500,
    name: 'DS_EMAIL_CC'
  })
  public DS_EMAIL_CC: string | null

  @Column('varchar2', {
    nullable: true,
    length: 200,
    name: 'NM_RESPONSAVEL_AGENTE'
  })
  public NM_RESPONSAVEL_AGENTE: string | null

  @Column('varchar2', {
    nullable: true,
    length: 200,
    name: 'NM_RESPONSAVEL_ANALISE_AGENTE'
  })
  public NM_RESPONSAVEL_ANALISE_AGENTE: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_ANALISE_AGENTE'
  })
  public DT_ANALISE_AGENTE: Date | null

  @ManyToOne(
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauPgiAis3,
    {}
  )
  @JoinColumn({ name: 'ID_STATUS' })
  public idStatus: SAU_ITEM_LOOKUP | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_JUSTIFICATIVA'
  })
  public DS_JUSTIFICATIVA: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_INICIO_EXECUCAO'
  })
  public DT_INICIO_EXECUCAO: Date | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_FIM_EXECUCAO'
  })
  public DT_FIM_EXECUCAO: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_DESPACHANTE_ONS_AGENTE_INI'
  })
  public NM_DESPACHANTE_ONS_AGENTE_INI: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_COS_INI'
  })
  public NM_OPERADOR_COS_INI: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_USINA_INI'
  })
  public NM_OPERADOR_USINA_INI: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_DESPACHANTE_ONS_AGENTE_FIM'
  })
  public NM_DESPACHANTE_ONS_AGENTE_FIM: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_COS_FIM'
  })
  public NM_OPERADOR_COS_FIM: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_USINA_FIM'
  })
  public NM_OPERADOR_USINA_FIM: string | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'CD_RESPONSAVEL_ANALISE_ENGIE'
  })
  public CD_RESPONSAVEL_ANALISE_ENGIE: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_ANALISE_ENGIE'
  })
  public DT_ANALISE_ENGIE: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'CD_RESPONSAVEL_CANCEL_ENGIE'
  })
  public CD_RESPONSAVEL_CANCEL_ENGIE: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_CANCEL_ENGIE'
  })
  public DT_CANCEL_ENGIE: Date | null

  @Column('varchar2', {
    nullable: false,
    length: 30,
    name: 'USER_CREATE'
  })
  public USER_CREATE: string

  @Column('timestamp with local time zone', {
    nullable: false,
    name: 'DATE_CREATE'
  })
  public DATE_CREATE: Date

  @Column('varchar2', {
    nullable: false,
    length: 30,
    name: 'USER_UPDATE'
  })
  public USER_UPDATE: string

  @Column('timestamp with local time zone', {
    nullable: false,
    name: 'DATE_UPDATE'
  })
  public DATE_UPDATE: Date

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null
}
