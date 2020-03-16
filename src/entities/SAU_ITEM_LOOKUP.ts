import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { SAU_LOOKUP } from './SAU_LOOKUP'
import { SAU_CLASSIFICACAO_PARADA } from './SAU_CLASSIFICACAO_PARADA'
import { SAU_DETALHAMENTO_EXECUCAO_DOCS } from './SAU_DETALHAMENTO_EXECUCAO_DOCS'
import { SAU_EQUIPAMENTO_PGI } from './SAU_EQUIPAMENTO_PGI'
import { SAU_EXECUCAO_DIARIA_DOCS } from './SAU_EXECUCAO_DIARIA_DOCS'
import { SAU_PGI } from './SAU_PGI'
import { SAU_PGI_AI } from './SAU_PGI_AI'
import { SAU_PROGRAMACAO_PARADA } from './SAU_PROGRAMACAO_PARADA'
import { SAU_PRORROGACAO_DOCS } from './SAU_PRORROGACAO_DOCS'
import { SAU_SUBCLASSIFICACAO_PARADA } from './SAU_SUBCLASSIFICACAO_PARADA'

@Entity('SAU_ITEM_LOOKUP')
export class SAU_ITEM_LOOKUP {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_ITEM_LOOKUP'
  })
  public CD_ITEM_LOOKUP: number

  @ManyToOne(
    () => SAU_LOOKUP,
    (SAU_LOOKUP: SAU_LOOKUP) => SAU_LOOKUP.sauItemLookups,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_LOOKUP' })
  public cdLookup: SAU_LOOKUP | null

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
    () => SAU_CLASSIFICACAO_PARADA,
    (SAU_CLASSIFICACAO_PARADA: SAU_CLASSIFICACAO_PARADA) => SAU_CLASSIFICACAO_PARADA.idAplicacaoParada
  )
  public sauClassificacaoParadas: SAU_CLASSIFICACAO_PARADA[]

  @OneToMany(
    () => SAU_DETALHAMENTO_EXECUCAO_DOCS,
    (SAU_DETALHAMENTO_EXECUCAO_DOCS: SAU_DETALHAMENTO_EXECUCAO_DOCS) => SAU_DETALHAMENTO_EXECUCAO_DOCS.idTipoDocumento
  )
  public sauDetalhamentoExecucaoDocss: SAU_DETALHAMENTO_EXECUCAO_DOCS[]

  @OneToMany(
    () => SAU_EQUIPAMENTO_PGI,
    (SAU_EQUIPAMENTO_PGI: SAU_EQUIPAMENTO_PGI) => SAU_EQUIPAMENTO_PGI.cdLocal
  )
  public sauEquipamentoPgis: SAU_EQUIPAMENTO_PGI[]

  @OneToMany(
    () => SAU_EQUIPAMENTO_PGI,
    (SAU_EQUIPAMENTO_PGI: SAU_EQUIPAMENTO_PGI) => SAU_EQUIPAMENTO_PGI.idUnidadeMedida
  )
  public sauEquipamentoPgis2: SAU_EQUIPAMENTO_PGI[]

  @OneToMany(
    () => SAU_EXECUCAO_DIARIA_DOCS,
    (SAU_EXECUCAO_DIARIA_DOCS: SAU_EXECUCAO_DIARIA_DOCS) => SAU_EXECUCAO_DIARIA_DOCS.idTipoDocumento
  )
  public sauExecucaoDiariaDocss: SAU_EXECUCAO_DIARIA_DOCS[]

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.idCaracterizacao
  )
  public sauPgis: SAU_PGI[]

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.idClassifiIntervencao
  )
  public sauPgis2: SAU_PGI[]

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.idNatureza
  )
  public sauPgis3: SAU_PGI[]

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.idPeriodicidade
  )
  public sauPgis4: SAU_PGI[]

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.idStatus
  )
  public sauPgis5: SAU_PGI[]

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.idTempoRetorno
  )
  public sauPgis6: SAU_PGI[]

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.idTipoCadastro
  )
  public sauPgis7: SAU_PGI[]

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.idTipo
  )
  public sauPgis8: SAU_PGI[]

  @OneToMany(
    () => SAU_PGI_AI,
    (SAU_PGI_AI: SAU_PGI_AI) => SAU_PGI_AI.idClassificacaoImpedimento
  )
  public sauPgiAis: SAU_PGI_AI[]

  @OneToMany(
    () => SAU_PGI_AI,
    (SAU_PGI_AI: SAU_PGI_AI) => SAU_PGI_AI.idDisporEquipamento
  )
  public sauPgiAis2: SAU_PGI_AI[]

  @OneToMany(
    () => SAU_PGI_AI,
    (SAU_PGI_AI: SAU_PGI_AI) => SAU_PGI_AI.idPeriodicidade
  )
  public sauPgiAis3: SAU_PGI_AI[]

  @OneToMany(
    () => SAU_PGI_AI,
    (SAU_PGI_AI: SAU_PGI_AI) => SAU_PGI_AI.idStatus
  )
  public sauPgiAis4: SAU_PGI_AI[]

  @OneToMany(
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.idMotivoReprogramacao
  )
  public sauProgramacaoParadas: SAU_PROGRAMACAO_PARADA[]

  @OneToMany(
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.idOrigemReprogramacao
  )
  public sauProgramacaoParadas2: SAU_PROGRAMACAO_PARADA[]

  @OneToMany(
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.idStatusCancelamento
  )
  public sauProgramacaoParadas3: SAU_PROGRAMACAO_PARADA[]

  @OneToMany(
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.idStatus
  )
  public sauProgramacaoParadas4: SAU_PROGRAMACAO_PARADA[]

  @OneToMany(
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.idStatusReprogramacao
  )
  public sauProgramacaoParadas5: SAU_PROGRAMACAO_PARADA[]

  @OneToMany(
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.idTipoParada
  )
  public sauProgramacaoParadas6: SAU_PROGRAMACAO_PARADA[]

  @OneToMany(
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.idTipoProgramacao
  )
  public sauProgramacaoParadas7: SAU_PROGRAMACAO_PARADA[]

  @OneToMany(
    () => SAU_PRORROGACAO_DOCS,
    (SAU_PRORROGACAO_DOCS: SAU_PRORROGACAO_DOCS) => SAU_PRORROGACAO_DOCS.idTipoDocumento
  )
  public sauProrrogacaoDocss: SAU_PRORROGACAO_DOCS[]

  @OneToMany(
    () => SAU_SUBCLASSIFICACAO_PARADA,
    (SAU_SUBCLASSIFICACAO_PARADA: SAU_SUBCLASSIFICACAO_PARADA) => SAU_SUBCLASSIFICACAO_PARADA.idAplicacaoUsina
  )
  public sauSubclassificacaoParadas: SAU_SUBCLASSIFICACAO_PARADA[]
}
