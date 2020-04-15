import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { UnidadeGeradora } from './unidadeGeradora'
import { TemLookup } from './temLookup'
import { AgenteOns } from './agenteOns'
import { ProgramacaoParada } from './programacaoParada'
import { ProrrogacaoPgi } from './prorrogacaoPgi'
import { AnexoPgi } from './anexoPgi'
import { DetalhamentoExecucaoPgi } from './detalhamentoExecucaoPgi'
import { EquipamentoPgi } from './equipamentoPgi'
import { ExcetoDiaPgi } from './excetoDiaPgi'
import { ExecucaoDiariaPgi } from './execucaoDiariaPgi'
import { HistoricoPgi } from './historicoPgi'
import { IntervencaoPgi } from './intervencaoPgi'
import { PgiAi } from './pgiAi'
import { ReprogramacaoPgi } from './reprogramacaoPgi'

@Entity('SAU_PGI')
@Index('SAU_PGI_IX2', ['SG_AGENTE_RESP'])
@Index('SAU_PGI_IX3', ['SG_AGENTE_SOLIC'])
@Index('SAU_PGI_IX4', ['idCaracterizacao'])
export class Pgi {
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
    () => UnidadeGeradora,
    (SAU_UNIDADE_GERADORA: UnidadeGeradora) => SAU_UNIDADE_GERADORA.sauPgis,
    {}
  )
  @JoinColumn({ name: 'CD_UNIDADE_GERADORA' })
  public cdUnidadeGeradora: UnidadeGeradora | null

  @Column('varchar2', {
    nullable: false,
    length: 50,
    name: 'NUM_PGI'
  })
  public NUM_PGI: string

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauPgis5,
    {}
  )
  @JoinColumn({ name: 'ID_STATUS' })
  public idStatus: TemLookup | null

  @ManyToOne(
    () => AgenteOns,
    (SAU_AGENTE_ONS: AgenteOns) => SAU_AGENTE_ONS.sauPgis2,
    {}
  )
  @JoinColumn({ name: 'CD_AGENTE_SOLIC' })
  public cdAgenteSolic: AgenteOns | null

  @ManyToOne(
    () => AgenteOns,
    (SAU_AGENTE_ONS: AgenteOns) => SAU_AGENTE_ONS.sauPgis,
    {}
  )
  @JoinColumn({ name: 'CD_AGENTE_RESP' })
  public cdAgenteResp: AgenteOns | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    precision: 1,
    scale: 0,
    name: 'FL_ENVIO_ANEEL'
  })
  public FL_ENVIO_ANEEL: number | null

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauPgis7,
    {}
  )
  @JoinColumn({ name: 'ID_TIPO_CADASTRO' })
  public idTipoCadastro: TemLookup | null

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
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauPgis2,
    {}
  )
  @JoinColumn({ name: 'ID_CLASSIFI_INTERVENCAO' })
  public idClassifiIntervencao: TemLookup | null

  @ManyToOne(
    () => ProgramacaoParada,
    (SAU_PROGRAMACAO_PARADA: ProgramacaoParada) => SAU_PROGRAMACAO_PARADA.sauPgis,
    {}
  )
  @JoinColumn({ name: 'CD_PROGRAMACAO_PARADA' })
  public cdProgramacaoParada: ProgramacaoParada | null

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
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauPgis6,
    {}
  )
  @JoinColumn({ name: 'ID_TEMPO_RETORNO' })
  public idTempoRetorno: TemLookup | null

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
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauPgis4,
    {}
  )
  @JoinColumn({ name: 'ID_PERIODICIDADE' })
  public idPeriodicidade: TemLookup | null

  @Column('varchar2', {
    nullable: true,
    length: 3,
    name: 'ID_DIAS_EXCETO'
  })
  public ID_DIAS_EXCETO: string | null

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauPgis3,
    {}
  )
  @JoinColumn({ name: 'ID_NATUREZA' })
  public idNatureza: TemLookup | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_JUSTIFICATIVA'
  })
  public DS_JUSTIFICATIVA: string | null

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauPgis8,
    {}
  )
  @JoinColumn({ name: 'ID_TIPO' })
  public idTipo: TemLookup | null

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauPgis,
    {}
  )
  @JoinColumn({ name: 'ID_CARACTERIZACAO' })
  public idCaracterizacao: TemLookup | null

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

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_MOTIVO_CANCELAMENTO'
  })
  public DS_MOTIVO_CANCELAMENTO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_RESPONSAVEL'
  })
  public NM_RESPONSAVEL: string | null

  @ManyToOne(
    () => ProrrogacaoPgi,
    (SAU_PRORROGACAO_PGI: ProrrogacaoPgi) => SAU_PRORROGACAO_PGI.sauPgis,
    {}
  )
  @JoinColumn({ name: 'CD_ULTIMA_PRORROGACAO' })
  public cdUltimaProrrogacao: ProrrogacaoPgi | null

  @OneToMany(
    () => AnexoPgi,
    (SAU_ANEXO_PGI: AnexoPgi) => SAU_ANEXO_PGI.cdPgi
  )
  public sauAnexoPgis: AnexoPgi[]

  @OneToMany(
    () => DetalhamentoExecucaoPgi,
    (SAU_DETALHAMENTO_EXECUCAO_PGI: DetalhamentoExecucaoPgi) => SAU_DETALHAMENTO_EXECUCAO_PGI.cdPgi
  )
  public sauDetalhamentoExecucaoPgis: DetalhamentoExecucaoPgi[]

  @OneToMany(
    () => EquipamentoPgi,
    (SAU_EQUIPAMENTO_PGI: EquipamentoPgi) => SAU_EQUIPAMENTO_PGI.cdPgi
  )
  public sauEquipamentoPgis: EquipamentoPgi[]

  @OneToMany(
    () => ExcetoDiaPgi,
    (SAU_EXCETO_DIA_PGI: ExcetoDiaPgi) => SAU_EXCETO_DIA_PGI.cdPgi
  )
  public sauExcetoDiaPgis: ExcetoDiaPgi[]

  @OneToMany(
    () => ExecucaoDiariaPgi,
    (SAU_EXECUCAO_DIARIA_PGI: ExecucaoDiariaPgi) => SAU_EXECUCAO_DIARIA_PGI.cdPgi
  )
  public sauExecucaoDiariaPgis: ExecucaoDiariaPgi[]

  @OneToMany(
    () => HistoricoPgi,
    (SAU_HISTORICO_PGI: HistoricoPgi) => SAU_HISTORICO_PGI.cdPgi
  )
  public sauHistoricoPgis: HistoricoPgi[]

  @OneToMany(
    () => IntervencaoPgi,
    (SAU_INTERVENCAO_PGI: IntervencaoPgi) => SAU_INTERVENCAO_PGI.cdPgi
  )
  public sauIntervencaoPgis: IntervencaoPgi[]

  @OneToMany(
    () => PgiAi,
    (SAU_PGI_AI: PgiAi) => SAU_PGI_AI.cdPgi
  )
  public sauPgiAis: PgiAi[]

  @OneToMany(
    () => ProrrogacaoPgi,
    (SAU_PRORROGACAO_PGI: ProrrogacaoPgi) => SAU_PRORROGACAO_PGI.cdPgi
  )
  public sauProrrogacaoPgis: ProrrogacaoPgi[]

  @OneToMany(
    () => ReprogramacaoPgi,
    (SAU_REPROGRAMACAO_PGI: ReprogramacaoPgi) => SAU_REPROGRAMACAO_PGI.cdPgi
  )
  public sauReprogramacaoPgis: ReprogramacaoPgi[]
}
