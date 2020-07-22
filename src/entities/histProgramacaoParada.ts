import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { ProgramacaoParada } from './programacaoParada'
import { TemLookup } from './temLookup'
import { ClassificacaoParada } from './classificacaoParada'
import { SubclassificacaoParada } from './subclassificacaoParada'

@Entity('SAU_HIST_PROGRAMACAO_PARADA')
export class HistProgramacaoParada {
  @ManyToOne(
    () => ProgramacaoParada,
    (SAU_PROGRAMACAO_PARADA: ProgramacaoParada) => SAU_PROGRAMACAO_PARADA.sauHistProgramacaoParadas,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_PROGRAMACAO_PARADA' })
  public cdProgramacaoParada: ProgramacaoParada | null

  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_HISTORICO'
  })
  public CD_HISTORICO: number

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_HISTORICO'
  })
  public DT_HISTORICO: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 200,
    name: 'NM_USUARIO'
  })
  public NM_USUARIO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_ACAO'
  })
  public DS_ACAO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_OBSERVACAO'
  })
  public DS_OBSERVACAO: string | null

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

  @Column('varchar2', {
    nullable: true,
    length: 20,
    name: 'FLOW'
  })
  public FLOW: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_HORA_INICIO_PROGRAMACAO'
  })
  public DT_HORA_INICIO_PROGRAMACAO: Date | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_HORA_TERMINO_PROGRAMACAO'
  })
  public DT_HORA_TERMINO_PROGRAMACAO: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_PROGRAMACAO_PARADA'
  })
  public DS_PROGRAMACAO_PARADA: string | null

  @Column('varchar2', {
    nullable: true,
    length: 1,
    name: 'ID_STATUS_PROGRAMACAO'
  })
  public ID_STATUS_PROGRAMACAO: string | null

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauHistProgramacaoParadas2,
    {}
  )
  @JoinColumn({ name: 'ID_STATUS' })
  public idStatus: TemLookup | null

  @Column('varchar2', {
    nullable: true,
    length: 50,
    name: 'DS_NUM_CEL_ANEEL'
  })
  public DS_NUM_CEL_ANEEL: string | null

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

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauHistProgramacaoParadas3,
    {}
  )
  @JoinColumn({ name: 'ID_STATUS_REPROGRAMACAO' })
  public idStatusReprogramacao: TemLookup | null

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauHistProgramacaoParadas,
    {}
  )
  @JoinColumn({ name: 'ID_STATUS_CANCELAMENTO' })
  public idStatusCancelamento: TemLookup | null

  @ManyToOne(
    () => ClassificacaoParada,
    (SAU_CLASSIFICACAO_PARADA: ClassificacaoParada) => SAU_CLASSIFICACAO_PARADA.sauHistProgramacaoParadas,
    {}
  )
  @JoinColumn({ name: 'CD_CLASSIFICACAO_PROGR_PARADA' })
  public cdClassificacaoProgrParada: ClassificacaoParada | null

  @ManyToOne(
    () => SubclassificacaoParada,
    (SubclassificacaoParada: SubclassificacaoParada) => SubclassificacaoParada.sauHistProgramacaoParadas,
    {}
  )
  @JoinColumn({ name: 'CD_SUBCLASSIF_PROGR_PARADA' })
  public cdSubclassifProgrParada: SubclassificacaoParada | null
}
