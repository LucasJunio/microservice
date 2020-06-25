import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { TemLookup } from './temLookup'
import { ClassificacaoParada } from './classificacaoParada'
import { SubclassificacaoParada } from './subclassificacaoParada'
import { HistProgramacaoParada } from './histProgramacaoParada'
import { Pgi } from './pgi'
import { ProgramacaoParadaUG } from './programacaoParadaUG'

@Entity('SAU_PROGRAMACAO_PARADA')
export class ProgramacaoParada {
  public usina: string

  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_PROGRAMACAO_PARADA'
  })
  public CD_PROGRAMACAO_PARADA: number

  // @Column('number', {
  //   nullable: false,
  //   name: 'CD_PARADA'
  // })
  // public CD_PARADA: number

  @Column('number', {
    nullable: false,
    name: 'CD_CONJUNTO_USINA'
  })
  public CD_CONJUNTO_USINA: number

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_CRIACAO_PARADA'
  })
  public DT_CRIACAO_PARADA: Date | null

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauProgramacaoParadas6,
    {}
  )
  @JoinColumn({ name: 'ID_TIPO_PARADA' })
  public idTipoParada: TemLookup | null

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauProgramacaoParadas4,
    {}
  )
  @JoinColumn({ name: 'ID_STATUS' })
  public idStatus: TemLookup | null

  @Column('timestamp with local time zone', {
    nullable: false,
    name: 'DT_HORA_INICIO_PROGRAMACAO'
  })
  public DT_HORA_INICIO_PROGRAMACAO: Date

  @Column('timestamp with local time zone', {
    nullable: false,
    name: 'DT_HORA_TERMINO_PROGRAMACAO'
  })
  public DT_HORA_TERMINO_PROGRAMACAO: Date

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauProgramacaoParadas7,
    {}
  )
  @JoinColumn({ name: 'ID_TIPO_PROGRAMACAO' })
  public idTipoProgramacao: TemLookup | null

  @Column('varchar2', {
    nullable: true,
    length: 15,
    name: 'NM_AREA_ORIGEM'
  })
  public NM_AREA_ORIGEM: string | null

  @ManyToOne(
    () => ClassificacaoParada,
    (SAU_CLASSIFICACAO_PARADA: ClassificacaoParada) => SAU_CLASSIFICACAO_PARADA.sauProgramacaoParadas2,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_CLASSIFICACAO_PROGR_PARADA' })
  public cdClassificacaoProgrParada: ClassificacaoParada | null

  @ManyToOne(
    () => SubclassificacaoParada,
    (SAU_SUBCLASSIFICACAO_PARADA: SubclassificacaoParada) => SAU_SUBCLASSIFICACAO_PARADA.sauProgramacaoParadas,
    {}
  )
  @JoinColumn({ name: 'CD_SUBCLASSIF_PROGR_PARADA' })
  public cdSubclassifProgrParada: SubclassificacaoParada | null

  @Column('varchar2', {
    nullable: true,
    length: 240,
    name: 'DS_PROGRAMACAO_PARADA'
  })
  public DS_PROGRAMACAO_PARADA: string | null

  @Column('varchar2', {
    nullable: true,
    length: 2500,
    name: 'DS_OBSERVACAO'
  })
  public DS_OBSERVACAO: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_HORA_INICIO_SERVICO'
  })
  public DT_HORA_INICIO_SERVICO: Date | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_HORA_TERMINO_SERVICO'
  })
  public DT_HORA_TERMINO_SERVICO: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 500,
    name: 'DS_SERVICO_EXECUTADO'
  })
  public DS_SERVICO_EXECUTADO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 50,
    name: 'DS_NUM_CEL_ANEEL'
  })
  public DS_NUM_CEL_ANEEL: string | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    precision: 1,
    scale: 0,
    name: 'FL_COMUNICAR_ANEEL'
  })
  public FL_COMUNICAR_ANEEL: number | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_CANCELAMENTO'
  })
  public DT_CANCELAMENTO: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 70,
    name: 'DS_MOTIVO_CANCELAMENTO'
  })
  public DS_MOTIVO_CANCELAMENTO: string | null

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauProgramacaoParadas3,
    {}
  )
  @JoinColumn({ name: 'ID_STATUS_CANCELAMENTO' })
  public idStatusCancelamento: TemLookup | null

  @Column('varchar2', {
    nullable: true,
    length: 15,
    name: 'NM_AREA_ORIGEM_CANCELAMENTO'
  })
  public NM_AREA_ORIGEM_CANCELAMENTO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'CD_USUARIO_CONCLUSAO'
  })
  public CD_USUARIO_CONCLUSAO: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_CONCLUSAO'
  })
  public DT_CONCLUSAO: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'CD_USUARIO_CANCELAMENTO'
  })
  public CD_USUARIO_CANCELAMENTO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 1,
    name: 'ID_STATUS_PROGRAMACAO'
  })
  public ID_STATUS_PROGRAMACAO: string | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    precision: 1,
    scale: 0,
    name: 'FL_REINICIAR_FLUXO'
  })
  public FL_REINICIAR_FLUXO: number | null

  @Column('varchar2', {
    nullable: true,
    length: 400,
    name: 'DS_LOG_STATUS'
  })
  public DS_LOG_STATUS: string | null

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
    precision: 5,
    scale: 0,
    name: 'NR_REPROGRAMACOES_APROVADAS'
  })
  public NR_REPROGRAMACOES_APROVADAS: number | null

  @Column('varchar2', {
    nullable: true,
    length: 1,
    name: 'ID_CONJUNTO_USINA'
  })
  public ID_CONJUNTO_USINA: string | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null

  @ManyToOne(
    () => SubclassificacaoParada,
    (SAU_SUBCLASSIFICACAO_PARADA: SubclassificacaoParada) => SAU_SUBCLASSIFICACAO_PARADA.sauProgramacaoParadas2,
    {}
  )
  @JoinColumn({ name: 'CD_SUBCLAS_REPROGR_PARADA' })
  public cdSubclasReprogrParada: SubclassificacaoParada | null

  @Column('varchar2', {
    nullable: true,
    length: 2500,
    name: 'DS_OBSERVACAO_REPROGR_PARADA'
  })
  public DS_OBSERVACAO_REPROGR_PARADA: string | null

  @Column('varchar2', {
    nullable: true,
    length: 15,
    name: 'NM_AREA_ORIGEM_REPROGRAMACAO'
  })
  public NM_AREA_ORIGEM_REPROGRAMACAO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 240,
    name: 'DS_NOVA_DESCRICAO_PROGR_PARADA'
  })
  public DS_NOVA_DESCRICAO_PROGR_PARADA: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_HORA_TERMINO_REPROGRAMACAO'
  })
  public DT_HORA_TERMINO_REPROGRAMACAO: Date | null

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauProgramacaoParadas2,
    {}
  )
  @JoinColumn({ name: 'ID_ORIGEM_REPROGRAMACAO' })
  public idOrigemReprogramacao: TemLookup | null

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauProgramacaoParadas,
    {}
  )
  @JoinColumn({ name: 'ID_MOTIVO_REPROGRAMACAO' })
  public idMotivoReprogramacao: TemLookup | null

  @ManyToOne(
    () => ClassificacaoParada,
    (SAU_CLASSIFICACAO_PARADA: ClassificacaoParada) => SAU_CLASSIFICACAO_PARADA.sauProgramacaoParadas,
    {}
  )
  @JoinColumn({ name: 'CD_CLASSIF_REPROGR_PARADA' })
  public cdClassifReprogrParada: ClassificacaoParada | null

  @Column('varchar2', {
    nullable: true,
    length: 240,
    name: 'DS_MOTIVO_REPROGRAMACAO'
  })
  public DS_MOTIVO_REPROGRAMACAO: string | null

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauProgramacaoParadas5,
    {}
  )
  @JoinColumn({ name: 'ID_STATUS_REPROGRAMACAO' })
  public idStatusReprogramacao: TemLookup | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_HORA_INICIO_REPROGRAMACAO'
  })
  public DT_HORA_INICIO_REPROGRAMACAO: Date | null

  @OneToMany(
    () => HistProgramacaoParada,
    (SAU_HIST_PROGRAMACAO_PARADA: HistProgramacaoParada) => SAU_HIST_PROGRAMACAO_PARADA.cdProgramacaoParada
  )
  public sauHistProgramacaoParadas: HistProgramacaoParada[]

  @OneToMany(
    () => Pgi,
    (SAU_PGI: Pgi) => SAU_PGI.cdProgramacaoParada
  )
  public sauPgis: Pgi[]

  @OneToMany(
    () => ProgramacaoParadaUG,
    (SAU_PROGRAMACAO_PARADA_UG: ProgramacaoParadaUG) => SAU_PROGRAMACAO_PARADA_UG.cdProgramacaoParada
  )
  public sauProgramacaoParadaUgs: ProgramacaoParadaUG[]
}
