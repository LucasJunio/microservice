import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { ClassificacaoParada } from './classificacaoParada'
import { TemLookup } from './temLookup'
import { ProgramacaoParada } from './programacaoParada'
import { HistProgramacaoParada } from './histProgramacaoParada'

@Entity('SAU_SUBCLASSIFICACAO_PARADA')
export class SubclassificacaoParada {
  @Column('number', {
    nullable: false,
    primary: true,
    precision: 10,
    scale: 0,
    name: 'CD_SUBCLASSIFICACAO_PARADA'
  })
  public CD_SUBCLASSIFICACAO_PARADA: number

  @Column('varchar2', {
    nullable: false,
    length: 200,
    name: 'DS_SUBCLASSIFICACAO_PARADA'
  })
  public DS_SUBCLASSIFICACAO_PARADA: string

  @ManyToOne(
    () => ClassificacaoParada,
    (SAU_CLASSIFICACAO_PARADA: ClassificacaoParada) => SAU_CLASSIFICACAO_PARADA.sauSubclassificacaoParadas,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_CLASSIFICACAO_PARADA' })
  public cdClassificacaoParada: ClassificacaoParada | null

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauSubclassificacaoParadas,
    {}
  )
  @JoinColumn({ name: 'ID_APLICACAO_USINA' })
  public idAplicacaoUsina: TemLookup | null

  @Column('number', {
    nullable: true,
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
    () => ProgramacaoParada,
    (SAU_PROGRAMACAO_PARADA: ProgramacaoParada) => SAU_PROGRAMACAO_PARADA.cdSubclassifProgrParada
  )
  public sauProgramacaoParadas: ProgramacaoParada[]

  @OneToMany(
    () => ProgramacaoParada,
    (SAU_PROGRAMACAO_PARADA: ProgramacaoParada) => SAU_PROGRAMACAO_PARADA.cdSubclasReprogrParada
  )
  public sauProgramacaoParadas2: ProgramacaoParada[]

  @OneToMany(
    () => HistProgramacaoParada,
    (SAU_HIST_PROGRAMACAO_PARADA: HistProgramacaoParada) => SAU_HIST_PROGRAMACAO_PARADA.cdSubclassifProgrParada
  )
  public sauHistProgramacaoParadas: HistProgramacaoParada[]
}
