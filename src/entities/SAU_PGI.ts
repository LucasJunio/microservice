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
import { SAU_UNIDADE_GERADORA } from './SAU_UNIDADE_GERADORA'
import { SAU_ITEM_LOOKUP } from './SAU_ITEM_LOOKUP'
import { SAU_AGENTE_ONS } from './SAU_AGENTE_ONS'
import { SAU_PROGRAMACAO_PARADA } from './SAU_PROGRAMACAO_PARADA'
import { SAU_ANEXO_PGI } from './SAU_ANEXO_PGI'
import { SAU_DETALHAMENTO_EXECUCAO_PGI } from './SAU_DETALHAMENTO_EXECUCAO_PGI'
import { SAU_EQUIPAMENTO_PGI } from './SAU_EQUIPAMENTO_PGI'
import { SAU_EXCETO_DIA_PGI } from './SAU_EXCETO_DIA_PGI'
import { SAU_EXECUCAO_DIARIA_PGI } from './SAU_EXECUCAO_DIARIA_PGI'
import { SAU_HISTORICO_PGI } from './SAU_HISTORICO_PGI'
import { SAU_INTERVENCAO_PGI } from './SAU_INTERVENCAO_PGI'
import { SAU_NEGOCIACAO_ONS_PGI } from './SAU_NEGOCIACAO_ONS_PGI'
import { SAU_PRORROGACAO_PGI } from './SAU_PRORROGACAO_PGI'
import { SAU_REPROGRAMACAO_PGI } from './SAU_REPROGRAMACAO_PGI'

@Entity('SAU_PGI')
@Index('SAU_PGI_IX2', ['SG_AGENTE_RESP'])
@Index('SAU_PGI_IX3', ['SG_AGENTE_SOLIC'])
@Index('SAU_PGI_IX4', ['idCaracterizacao'])
export class SAU_PGI {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_PGI'
  })
  public CD_PGI: number

  @Column('varchar2', {
    nullable: false,
    length: 1,
    name: 'ID_CONJUNTO_USINA'
  })
  public ID_CONJUNTO_USINA: string

  @ManyToOne(
    () => SAU_UNIDADE_GERADORA,
    (SAU_UNIDADE_GERADORA: SAU_UNIDADE_GERADORA) => SAU_UNIDADE_GERADORA.sauPgis,
    {}
  )
  @JoinColumn({ name: 'CD_UNIDADE_GERADORA' })
  public cdUnidadeGeradora: SAU_UNIDADE_GERADORA | null

  @Column('varchar2', {
    nullable: false,
    length: 50,
    name: 'NUM_PGI'
  })
  public NUM_PGI: string

  @ManyToOne(
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauPgis5,
    {}
  )
  @JoinColumn({ name: 'ID_STATUS' })
  public idStatus: SAU_ITEM_LOOKUP | null

  @ManyToOne(
    () => SAU_AGENTE_ONS,
    (SAU_AGENTE_ONS: SAU_AGENTE_ONS) => SAU_AGENTE_ONS.sauPgis2,
    {}
  )
  @JoinColumn({ name: 'CD_AGENTE_SOLIC' })
  public cdAgenteSolic: SAU_AGENTE_ONS | null

  @ManyToOne(
    () => SAU_AGENTE_ONS,
    (SAU_AGENTE_ONS: SAU_AGENTE_ONS) => SAU_AGENTE_ONS.sauPgis,
    {}
  )
  @JoinColumn({ name: 'CD_AGENTE_RESP' })
  public cdAgenteResp: SAU_AGENTE_ONS | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    precision: 1,
    scale: 0,
    name: 'FL_ENVIO_ANEEL'
  })
  public FL_ENVIO_ANEEL: number | null

  @ManyToOne(
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauPgis7,
    {}
  )
  @JoinColumn({ name: 'ID_TIPO_CADASTRO' })
  public idTipoCadastro: SAU_ITEM_LOOKUP | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_INICIO_PREVISTO'
  })
  public DT_INICIO_PREVISTO: Date | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_FIM_PREVISTO'
  })
  public DT_FIM_PREVISTO: Date | null

  @ManyToOne(
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauPgis2,
    {}
  )
  @JoinColumn({ name: 'ID_CLASSIFI_INTERVENCAO' })
  public idClassifiIntervencao: SAU_ITEM_LOOKUP | null

  @ManyToOne(
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.sauPgis,
    {}
  )
  @JoinColumn({ name: 'CD_PROGRAMACAO_PARADA' })
  public cdProgramacaoParada: SAU_PROGRAMACAO_PARADA | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_SERVICO'
  })
  public DS_SERVICO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_OBSERVACAO_LIMITACAO'
  })
  public DS_OBSERVACAO_LIMITACAO: string | null

  @ManyToOne(
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauPgis6,
    {}
  )
  @JoinColumn({ name: 'ID_TEMPO_RETORNO' })
  public idTempoRetorno: SAU_ITEM_LOOKUP | null

  @Column('number', {
    nullable: true,
    precision: 6,
    scale: 0,
    name: 'NR_TEMPO_RETORNO_HH'
  })
  public NR_TEMPO_RETORNO_HH: number | null

  @Column('number', {
    nullable: true,
    precision: 2,
    scale: 0,
    name: 'NR_TEMPO_RETORNO_MI'
  })
  public NR_TEMPO_RETORNO_MI: number | null

  @ManyToOne(
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauPgis4,
    {}
  )
  @JoinColumn({ name: 'ID_PERIODICIDADE' })
  public idPeriodicidade: SAU_ITEM_LOOKUP | null

  @Column('varchar2', {
    nullable: true,
    length: 3,
    name: 'ID_DIAS_EXCETO'
  })
  public ID_DIAS_EXCETO: string | null

  @ManyToOne(
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauPgis3,
    {}
  )
  @JoinColumn({ name: 'ID_NATUREZA' })
  public idNatureza: SAU_ITEM_LOOKUP | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_JUSTIFICATIVA'
  })
  public DS_JUSTIFICATIVA: string | null

  @ManyToOne(
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauPgis8,
    {}
  )
  @JoinColumn({ name: 'ID_TIPO' })
  public idTipo: SAU_ITEM_LOOKUP | null

  @ManyToOne(
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauPgis,
    {}
  )
  @JoinColumn({ name: 'ID_CARACTERIZACAO' })
  public idCaracterizacao: SAU_ITEM_LOOKUP | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_RISCO_DESLIG'
  })
  public FL_RISCO_DESLIG: number | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_RISCO_DESLIG'
  })
  public DS_RISCO_DESLIG: string | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_DEP_TEMPO_BOM'
  })
  public FL_DEP_TEMPO_BOM: number | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_DEP_TEMPO_BOM'
  })
  public DS_DEP_TEMPO_BOM: string | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_ANTECEDENCIA'
  })
  public DS_ANTECEDENCIA: string | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_POSTERGACAO_RISCO'
  })
  public DS_POSTERGACAO_RISCO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 1,
    name: 'ID_NOTURNO'
  })
  public ID_NOTURNO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_NOTURNO'
  })
  public DS_NOTURNO: string | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'ID_APROVEITAMENTO'
  })
  public ID_APROVEITAMENTO: number | null

  @Column('varchar2', {
    nullable: true,
    length: 20,
    name: 'DS_APROVEITAMENTO'
  })
  public DS_APROVEITAMENTO: string | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'ID_INCLUSAO_SERVICO'
  })
  public ID_INCLUSAO_SERVICO: number | null

  @Column('varchar2', {
    nullable: true,
    length: 20,
    name: 'DS_INCLUSAO_SERVICO'
  })
  public DS_INCLUSAO_SERVICO: string | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'ID_INTERV_SUSP_ONS'
  })
  public ID_INTERV_SUSP_ONS: number | null

  @Column('varchar2', {
    nullable: true,
    length: 20,
    name: 'DS_INTERV_SUSP_ONS'
  })
  public DS_INTERV_SUSP_ONS: string | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'ID_INTERV_COM_RELE'
  })
  public ID_INTERV_COM_RELE: number | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_ULTIMA_ALTER'
  })
  public DT_ULTIMA_ALTER: Date | null

  @Column('varchar2', {
    nullable: true,
    name: 'CD_USUARIO_ULTIMA_ALTER'
  })
  public CD_USUARIO_ULTIMA_ALTER: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_ANALISE'
  })
  public DT_ANALISE: Date | null

  @Column('varchar2', {
    nullable: true,
    name: 'CD_RESP_ANALISE'
  })
  public CD_RESP_ANALISE: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_APROVACAO'
  })
  public DT_APROVACAO: Date | null

  @Column('varchar2', {
    nullable: true,
    name: 'CD_RESP_APROVACAO'
  })
  public CD_RESP_APROVACAO: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_CONCLUSAO'
  })
  public DT_CONCLUSAO: Date | null

  @Column('varchar2', {
    nullable: true,
    name: 'CD_RESP_CONCLUSAO'
  })
  public CD_RESP_CONCLUSAO: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_NEGACAO'
  })
  public DT_NEGACAO: Date | null

  @Column('varchar2', {
    nullable: true,
    name: 'CD_RESP_NEGACAO'
  })
  public CD_RESP_NEGACAO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_MOTIVO_CANCELAMENTO'
  })
  public DS_MOTIVO_CANCELAMENTO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_MOTIVO_NEGACAO'
  })
  public DS_MOTIVO_NEGACAO: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_CANCELAMENTO'
  })
  public DT_CANCELAMENTO: Date | null

  @Column('varchar2', {
    nullable: true,
    name: 'CD_RESP_CANCELAMENTO'
  })
  public CD_RESP_CANCELAMENTO: string | null

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

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_DESP_ONS_AGENTE_INICIO'
  })
  public NM_DESP_ONS_AGENTE_INICIO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_COS_INICIO'
  })
  public NM_OPERADOR_COS_INICIO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_USINA_INICIO'
  })
  public NM_OPERADOR_USINA_INICIO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_DESP_ONS_AGENTE_FIM'
  })
  public NM_DESP_ONS_AGENTE_FIM: string | null

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

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_INICIO_CONF_SGI'
  })
  public FL_INICIO_CONF_SGI: number | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_TERMINO_CONF_SGI'
  })
  public FL_TERMINO_CONF_SGI: number | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_ANULACAO_CONCLUSAO'
  })
  public DT_ANULACAO_CONCLUSAO: Date | null

  @Column('varchar2', {
    nullable: true,
    name: 'CD_RESP_ANULACAO_CONCLUSAO'
  })
  public CD_RESP_ANULACAO_CONCLUSAO: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DATE_UPDATE'
  })
  public DATE_UPDATE: Date | null

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

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'USER_CREATE'
  })
  public USER_CREATE: string | null

  @Column('number', {
    nullable: false,
    name: 'CD_CONJUNTO_USINA'
  })
  public CD_CONJUNTO_USINA: number

  @Column('varchar2', {
    nullable: true,
    length: 20,
    name: 'SG_AGENTE_SOLIC'
  })
  public SG_AGENTE_SOLIC: string | null

  @Column('varchar2', {
    nullable: true,
    length: 20,
    name: 'SG_AGENTE_RESP'
  })
  public SG_AGENTE_RESP: string | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_POSTERGACAO_RISCO'
  })
  public FL_POSTERGACAO_RISCO: number | null

  @Column('varchar2', {
    nullable: true,
    length: 20,
    name: 'NUM_DOC_EXTERNO'
  })
  public NUM_DOC_EXTERNO: string | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_IMPEDIMENTO'
  })
  public FL_IMPEDIMENTO: number | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_ISOLACAO'
  })
  public FL_ISOLACAO: number | null

  @Column('varchar2', {
    nullable: true,
    length: 20,
    name: 'DS_OS_PLANO_ISOLACAO'
  })
  public DS_OS_PLANO_ISOLACAO: string | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null

  @OneToMany(
    () => SAU_ANEXO_PGI,
    (SAU_ANEXO_PGI: SAU_ANEXO_PGI) => SAU_ANEXO_PGI.cdPgi
  )
  public sauAnexoPgis: SAU_ANEXO_PGI[]

  @OneToMany(
    () => SAU_DETALHAMENTO_EXECUCAO_PGI,
    (SAU_DETALHAMENTO_EXECUCAO_PGI: SAU_DETALHAMENTO_EXECUCAO_PGI) => SAU_DETALHAMENTO_EXECUCAO_PGI.cdPgi
  )
  public sauDetalhamentoExecucaoPgis: SAU_DETALHAMENTO_EXECUCAO_PGI[]

  @OneToMany(
    () => SAU_EQUIPAMENTO_PGI,
    (SAU_EQUIPAMENTO_PGI: SAU_EQUIPAMENTO_PGI) => SAU_EQUIPAMENTO_PGI.cdPgi
  )
  public sauEquipamentoPgis: SAU_EQUIPAMENTO_PGI[]

  @OneToMany(
    () => SAU_EXCETO_DIA_PGI,
    (SAU_EXCETO_DIA_PGI: SAU_EXCETO_DIA_PGI) => SAU_EXCETO_DIA_PGI.cdPgi
  )
  public sauExcetoDiaPgis: SAU_EXCETO_DIA_PGI[]

  @OneToMany(
    () => SAU_EXECUCAO_DIARIA_PGI,
    (SAU_EXECUCAO_DIARIA_PGI: SAU_EXECUCAO_DIARIA_PGI) => SAU_EXECUCAO_DIARIA_PGI.cdPgi
  )
  public sauExecucaoDiariaPgis: SAU_EXECUCAO_DIARIA_PGI[]

  @OneToMany(
    () => SAU_HISTORICO_PGI,
    (SAU_HISTORICO_PGI: SAU_HISTORICO_PGI) => SAU_HISTORICO_PGI.cdPgi
  )
  public sauHistoricoPgis: SAU_HISTORICO_PGI[]

  @OneToMany(
    () => SAU_INTERVENCAO_PGI,
    (SAU_INTERVENCAO_PGI: SAU_INTERVENCAO_PGI) => SAU_INTERVENCAO_PGI.cdPgi
  )
  public sauIntervencaoPgis: SAU_INTERVENCAO_PGI[]

  @OneToMany(
    () => SAU_NEGOCIACAO_ONS_PGI,
    (SAU_NEGOCIACAO_ONS_PGI: SAU_NEGOCIACAO_ONS_PGI) => SAU_NEGOCIACAO_ONS_PGI.cdPgi
  )
  public sauNegociacaoOnsPgis: SAU_NEGOCIACAO_ONS_PGI[]

  @OneToMany(
    () => SAU_PRORROGACAO_PGI,
    (SAU_PRORROGACAO_PGI: SAU_PRORROGACAO_PGI) => SAU_PRORROGACAO_PGI.cdPgi
  )
  public sauProrrogacaoPgis: SAU_PRORROGACAO_PGI[]

  @OneToMany(
    () => SAU_REPROGRAMACAO_PGI,
    (SAU_REPROGRAMACAO_PGI: SAU_REPROGRAMACAO_PGI) => SAU_REPROGRAMACAO_PGI.cdPgi
  )
  public sauReprogramacaoPgis: SAU_REPROGRAMACAO_PGI[]
}
