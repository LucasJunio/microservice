import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { SAU_CLASSIFICACAO_PARADA } from './SAU_CLASSIFICACAO_PARADA'
import { SAU_ITEM_LOOKUP } from './SAU_ITEM_LOOKUP'
import { SAU_PROGRAMACAO_PARADA } from './SAU_PROGRAMACAO_PARADA'
import { SAU_REPROGRAMACAO_PARADA } from './SAU_REPROGRAMACAO_PARADA'

@Entity('SAU_SUBCLASSIFICACAO_PARADA')
export class SAU_SUBCLASSIFICACAO_PARADA {
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
    () => SAU_CLASSIFICACAO_PARADA,
    (SAU_CLASSIFICACAO_PARADA: SAU_CLASSIFICACAO_PARADA) => SAU_CLASSIFICACAO_PARADA.sauSubclassificacaoParadas,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_CLASSIFICACAO_PARADA' })
  public cdClassificacaoParada: SAU_CLASSIFICACAO_PARADA | null

  @ManyToOne(
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauSubclassificacaoParadas,
    {}
  )
  @JoinColumn({ name: 'ID_APLICACAO_USINA' })
  public idAplicacaoUsina: SAU_ITEM_LOOKUP | null

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
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.cdSubclassifProgrParada
  )
  public sauProgramacaoParadas: SAU_PROGRAMACAO_PARADA[]

  @OneToMany(
    () => SAU_REPROGRAMACAO_PARADA,
    (SAU_REPROGRAMACAO_PARADA: SAU_REPROGRAMACAO_PARADA) => SAU_REPROGRAMACAO_PARADA.cdSubclasReprogrParada
  )
  public sauReprogramacaoParadas: SAU_REPROGRAMACAO_PARADA[]
}
