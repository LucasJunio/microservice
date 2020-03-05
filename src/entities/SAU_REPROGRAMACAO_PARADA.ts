import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { SAU_PROGRAMACAO_PARADA } from './SAU_PROGRAMACAO_PARADA'
import { SAU_ITEM_LOOKUP } from './SAU_ITEM_LOOKUP'
import { SAU_CLASSIFICACAO_PARADA } from './SAU_CLASSIFICACAO_PARADA'
import { SAU_SUBCLASSIFICACAO_PARADA } from './SAU_SUBCLASSIFICACAO_PARADA'

@Entity('SAU_REPROGRAMACAO_PARADA')
export class SAU_REPROGRAMACAO_PARADA {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_REPROGRAMACAO_PARADA'
  })
  public CD_REPROGRAMACAO_PARADA: number

  @ManyToOne(
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.sauReprogramacaoParadas,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_PROGRAMACAO_PARADA' })
  public cdProgramacaoParada: SAU_PROGRAMACAO_PARADA | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_HORA_INICIO_REPROGRAMACAO'
  })
  public DT_HORA_INICIO_REPROGRAMACAO: Date | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_HORA_TERMINO_REPROGRAMACAO'
  })
  public DT_HORA_TERMINO_REPROGRAMACAO: Date | null

  @ManyToOne(
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauReprogramacaoParadas3,
    {}
  )
  @JoinColumn({ name: 'ID_STATUS_REPROGRAMACAO' })
  public idStatusReprogramacao: SAU_ITEM_LOOKUP | null

  @ManyToOne(
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauReprogramacaoParadas2,
    {}
  )
  @JoinColumn({ name: 'ID_ORIGEM_REPROGRAMACAO' })
  public idOrigemReprogramacao: SAU_ITEM_LOOKUP | null

  @ManyToOne(
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauReprogramacaoParadas,
    {}
  )
  @JoinColumn({ name: 'ID_MOTIVO_REPROGRAMACAO' })
  public idMotivoReprogramacao: SAU_ITEM_LOOKUP | null

  @Column('varchar2', {
    nullable: true,
    length: 240,
    name: 'DS_MOTIVO_REPROGRAMACAO'
  })
  public DS_MOTIVO_REPROGRAMACAO: string | null

  @ManyToOne(
    () => SAU_CLASSIFICACAO_PARADA,
    (SAU_CLASSIFICACAO_PARADA: SAU_CLASSIFICACAO_PARADA) => SAU_CLASSIFICACAO_PARADA.sauReprogramacaoParadas,
    {}
  )
  @JoinColumn({ name: 'CD_CLASSIF_REPROGR_PARADA' })
  public cdClassifReprogrParada: SAU_CLASSIFICACAO_PARADA | null

  @ManyToOne(
    () => SAU_SUBCLASSIFICACAO_PARADA,
    (SAU_SUBCLASSIFICACAO_PARADA: SAU_SUBCLASSIFICACAO_PARADA) => SAU_SUBCLASSIFICACAO_PARADA.sauReprogramacaoParadas,
    {}
  )
  @JoinColumn({ name: 'CD_SUBCLAS_REPROGR_PARADA' })
  public cdSubclasReprogrParada: SAU_SUBCLASSIFICACAO_PARADA | null

  @Column('varchar2', {
    nullable: true,
    length: 240,
    name: 'DS_NOVA_DESCRICAO_PROGR_PARADA'
  })
  public DS_NOVA_DESCRICAO_PROGR_PARADA: string | null

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
}
