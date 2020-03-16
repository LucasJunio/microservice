import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { SAU_ITEM_LOOKUP } from './SAU_ITEM_LOOKUP'
import { SAU_PROGRAMACAO_PARADA } from './SAU_PROGRAMACAO_PARADA'
import { SAU_REPROGRAMACAO_PARADA } from './SAU_REPROGRAMACAO_PARADA'
import { SAU_SUBCLASSIFICACAO_PARADA } from './SAU_SUBCLASSIFICACAO_PARADA'

@Entity('SAU_CLASSIFICACAO_PARADA')
export class SAU_CLASSIFICACAO_PARADA {
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
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauClassificacaoParadas,
    {}
  )
  @JoinColumn({ name: 'ID_APLICACAO_PARADA' })
  public idAplicacaoParada: SAU_ITEM_LOOKUP | null

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
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.cdClassificacaoProgrParada
  )
  public sauProgramacaoParadas: SAU_PROGRAMACAO_PARADA[]

  @OneToMany(
    () => SAU_REPROGRAMACAO_PARADA,
    (SAU_REPROGRAMACAO_PARADA: SAU_REPROGRAMACAO_PARADA) => SAU_REPROGRAMACAO_PARADA.cdClassifReprogrParada
  )
  public sauReprogramacaoParadas: SAU_REPROGRAMACAO_PARADA[]

  @OneToMany(
    () => SAU_SUBCLASSIFICACAO_PARADA,
    (SAU_SUBCLASSIFICACAO_PARADA: SAU_SUBCLASSIFICACAO_PARADA) => SAU_SUBCLASSIFICACAO_PARADA.cdClassificacaoParada
  )
  public sauSubclassificacaoParadas: SAU_SUBCLASSIFICACAO_PARADA[]
}