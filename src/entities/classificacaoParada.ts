import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { TemLookup } from './temLookup'
import { ProgramacaoParada } from './programacaoParada'
import { SubclassificacaoParada } from './subclassificacaoParada'

@Entity('SAU_CLASSIFICACAO_PARADA')
export class ClassificacaoParada {
  @Column('number', {
    nullable: false,
    primary: true,
    precision: 2,
    scale: 0,
    name: 'CD_CLASSIFICACAO_PARADA'
  })
  public CD_CLASSIFICACAO_PARADA: number

  @Column('varchar2', {
    nullable: false,
    length: 100,
    name: 'DS_CLASSIFICACAO_PARADA'
  })
  public DS_CLASSIFICACAO_PARADA: string

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauClassificacaoParadas,
    {}
  )
  @JoinColumn({ name: 'ID_APLICACAO_PARADA' })
  public idAplicacaoParada: TemLookup | null

  @Column('number', {
    nullable: false,
    precision: 1,
    scale: 0,
    name: 'FL_ATIVO'
  })
  public FL_ATIVO: number

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
    (SAU_PROGRAMACAO_PARADA: ProgramacaoParada) => SAU_PROGRAMACAO_PARADA.cdClassifReprogrParada
  )
  public sauProgramacaoParadas: ProgramacaoParada[]

  @OneToMany(
    () => ProgramacaoParada,
    (SAU_PROGRAMACAO_PARADA: ProgramacaoParada) => SAU_PROGRAMACAO_PARADA.cdClassificacaoProgrParada
  )
  public sauProgramacaoParadas2: ProgramacaoParada[]

  @OneToMany(
    () => SubclassificacaoParada,
    (SAU_SUBCLASSIFICACAO_PARADA: SubclassificacaoParada) => SAU_SUBCLASSIFICACAO_PARADA.cdClassificacaoParada
  )
  public sauSubclassificacaoParadas: SubclassificacaoParada[]
}
