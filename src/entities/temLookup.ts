import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { Lookup } from './lookup'
import { ClassificacaoParada } from './classificacaoParada'
import { DetalhamentoExecucaoDocs } from './detalhamentoExecucaoDocs'
import { EquipamentoPgi } from './equipamentoPgi'
import { ExecucaoDiariaDocs } from './execucaoDiariaDocs'
import { Pgi } from './pgi'
import { PgiAi } from './pgiAi'
import { ProgramacaoParada } from './programacaoParada'
import { ProrrogacaoDocs } from './prorrogacaoDocs'
import { SubclassificacaoParada } from './subclassificacaoParada'
import { GrupoRestricao } from './grupoRestricao'
import { HistProgramacaoParada } from './histProgramacaoParada'

@Entity('SAU_ITEM_LOOKUP')
export class TemLookup {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_ITEM_LOOKUP'
  })
  public CD_ITEM_LOOKUP: number

  @ManyToOne(
    () => Lookup,
    (SAU_LOOKUP: Lookup) => SAU_LOOKUP.sauItemLookups,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_LOOKUP' })
  public cdLookup: Lookup | null

  @Column('varchar2', {
    nullable: false,
    unique: true,
    length: 30,
    name: 'ID_ITEM_LOOKUP'
  })
  public ID_ITEM_LOOKUP: string

  @Column('varchar2', {
    nullable: false,
    length: 400,
    name: 'DS_ITEM_LOOKUP'
  })
  public DS_ITEM_LOOKUP: string

  @Column('number', {
    nullable: true,
    default: () => '1',
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
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null

  @OneToMany(
    () => ClassificacaoParada,
    (SAU_CLASSIFICACAO_PARADA: ClassificacaoParada) => SAU_CLASSIFICACAO_PARADA.idAplicacaoParada
  )
  public sauClassificacaoParadas: ClassificacaoParada[]

  @OneToMany(
    () => DetalhamentoExecucaoDocs,
    (SAU_DETALHAMENTO_EXECUCAO_DOCS: DetalhamentoExecucaoDocs) => SAU_DETALHAMENTO_EXECUCAO_DOCS.idTipoDocumento
  )
  public sauDetalhamentoExecucaoDocss: DetalhamentoExecucaoDocs[]

  @OneToMany(
    () => EquipamentoPgi,
    (SAU_EQUIPAMENTO_PGI: EquipamentoPgi) => SAU_EQUIPAMENTO_PGI.cdLocal
  )
  public sauEquipamentoPgis: EquipamentoPgi[]

  @OneToMany(
    () => EquipamentoPgi,
    (SAU_EQUIPAMENTO_PGI: EquipamentoPgi) => SAU_EQUIPAMENTO_PGI.idUnidadeMedida
  )
  public sauEquipamentoPgis2: EquipamentoPgi[]

  @OneToMany(
    () => ExecucaoDiariaDocs,
    (SAU_EXECUCAO_DIARIA_DOCS: ExecucaoDiariaDocs) => SAU_EXECUCAO_DIARIA_DOCS.idTipoDocumento
  )
  public sauExecucaoDiariaDocss: ExecucaoDiariaDocs[]

  @OneToMany(
    () => Pgi,
    (SAU_PGI: Pgi) => SAU_PGI.idCaracterizacao
  )
  public sauPgis: Pgi[]

  @OneToMany(
    () => Pgi,
    (SAU_PGI: Pgi) => SAU_PGI.idClassifiIntervencao
  )
  public sauPgis2: Pgi[]

  @OneToMany(
    () => Pgi,
    (SAU_PGI: Pgi) => SAU_PGI.idNatureza
  )
  public sauPgis3: Pgi[]

  @OneToMany(
    () => Pgi,
    (SAU_PGI: Pgi) => SAU_PGI.idPeriodicidade
  )
  public sauPgis4: Pgi[]

  @OneToMany(
    () => Pgi,
    (SAU_PGI: Pgi) => SAU_PGI.idStatus
  )
  public sauPgis5: Pgi[]

  @OneToMany(
    () => Pgi,
    (SAU_PGI: Pgi) => SAU_PGI.idTempoRetorno
  )
  public sauPgis6: Pgi[]

  @OneToMany(
    () => Pgi,
    (SAU_PGI: Pgi) => SAU_PGI.idTipoCadastro
  )
  public sauPgis7: Pgi[]

  @OneToMany(
    () => Pgi,
    (SAU_PGI: Pgi) => SAU_PGI.idTipo
  )
  public sauPgis8: Pgi[]

  @OneToMany(
    () => PgiAi,
    (SAU_PGI_AI: PgiAi) => SAU_PGI_AI.idClassificacaoImpedimento
  )
  public sauPgiAis: PgiAi[]

  @OneToMany(
    () => PgiAi,
    (SAU_PGI_AI: PgiAi) => SAU_PGI_AI.idDisporEquipamento
  )
  public sauPgiAis2: PgiAi[]

  @OneToMany(
    () => PgiAi,
    (SAU_PGI_AI: PgiAi) => SAU_PGI_AI.idPeriodicidade
  )
  public sauPgiAis3: PgiAi[]

  @OneToMany(
    () => PgiAi,
    (SAU_PGI_AI: PgiAi) => SAU_PGI_AI.idStatus
  )
  public sauPgiAis4: PgiAi[]

  @OneToMany(
    () => ProgramacaoParada,
    (SAU_PROGRAMACAO_PARADA: ProgramacaoParada) => SAU_PROGRAMACAO_PARADA.idMotivoReprogramacao
  )
  public sauProgramacaoParadas: ProgramacaoParada[]

  @OneToMany(
    () => ProgramacaoParada,
    (SAU_PROGRAMACAO_PARADA: ProgramacaoParada) => SAU_PROGRAMACAO_PARADA.idOrigemReprogramacao
  )
  public sauProgramacaoParadas2: ProgramacaoParada[]

  @OneToMany(
    () => ProgramacaoParada,
    (SAU_PROGRAMACAO_PARADA: ProgramacaoParada) => SAU_PROGRAMACAO_PARADA.idStatusCancelamento
  )
  public sauProgramacaoParadas3: ProgramacaoParada[]

  @OneToMany(
    () => ProgramacaoParada,
    (SAU_PROGRAMACAO_PARADA: ProgramacaoParada) => SAU_PROGRAMACAO_PARADA.idStatus
  )
  public sauProgramacaoParadas4: ProgramacaoParada[]

  @OneToMany(
    () => ProgramacaoParada,
    (SAU_PROGRAMACAO_PARADA: ProgramacaoParada) => SAU_PROGRAMACAO_PARADA.idStatusReprogramacao
  )
  public sauProgramacaoParadas5: ProgramacaoParada[]

  @OneToMany(
    () => ProgramacaoParada,
    (SAU_PROGRAMACAO_PARADA: ProgramacaoParada) => SAU_PROGRAMACAO_PARADA.idTipoParada
  )
  public sauProgramacaoParadas6: ProgramacaoParada[]

  @OneToMany(
    () => ProgramacaoParada,
    (SAU_PROGRAMACAO_PARADA: ProgramacaoParada) => SAU_PROGRAMACAO_PARADA.idTipoProgramacao
  )
  public sauProgramacaoParadas7: ProgramacaoParada[]

  @OneToMany(
    () => ProrrogacaoDocs,
    (SAU_PRORROGACAO_DOCS: ProrrogacaoDocs) => SAU_PRORROGACAO_DOCS.idTipoDocumento
  )
  public sauProrrogacaoDocss: ProrrogacaoDocs[]

  @OneToMany(
    () => SubclassificacaoParada,
    (SAU_SUBCLASSIFICACAO_PARADA: SubclassificacaoParada) => SAU_SUBCLASSIFICACAO_PARADA.idAplicacaoUsina
  )
  public sauSubclassificacaoParadas: SubclassificacaoParada[]

  @OneToMany(
    () => GrupoRestricao,
    (RESTRICAO: GrupoRestricao) => RESTRICAO.idGrupo
  )
  public sauIdGrupo: GrupoRestricao[]

  @OneToMany(
    () => GrupoRestricao,
    (RESTRICAO: GrupoRestricao) => RESTRICAO.idTipoRestricao
  )
  public sauIdTipoRestricao: GrupoRestricao[]

  @OneToMany(
    () => HistProgramacaoParada,
    (SAU_HIST_PROGRAMACAO_PARADA: HistProgramacaoParada) => SAU_HIST_PROGRAMACAO_PARADA.idStatus
  )
  public sauHistProgramacaoParadas2: HistProgramacaoParada[]

  @OneToMany(
    () => HistProgramacaoParada,
    (SAU_HIST_PROGRAMACAO_PARADA: HistProgramacaoParada) => SAU_HIST_PROGRAMACAO_PARADA.idStatusReprogramacao
  )
  public sauHistProgramacaoParadas3: HistProgramacaoParada[]

  @OneToMany(
    () => HistProgramacaoParada,
    (SAU_HIST_PROGRAMACAO_PARADA: HistProgramacaoParada) => SAU_HIST_PROGRAMACAO_PARADA.idStatusCancelamento
  )
  public sauHistProgramacaoParadas: HistProgramacaoParada[]
}
