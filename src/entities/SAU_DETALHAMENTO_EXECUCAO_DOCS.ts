import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { SAU_ITEM_LOOKUP } from './SAU_ITEM_LOOKUP'

@Entity('SAU_DETALHAMENTO_EXECUCAO_DOCS')
export class SAU_DETALHAMENTO_EXECUCAO_DOCS {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_DETALHAMENTO_EXECUCAO_DOCS'
  })
  public CD_DETALHAMENTO_EXECUCAO_DOCS: number

  @Column('number', {
    nullable: false,
    unique: true,
    name: 'CD_DOCUMENTO'
  })
  public CD_DOCUMENTO: number

  @ManyToOne(
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauDetalhamentoExecucaoDocss,
    { nullable: false }
  )
  @JoinColumn({ name: 'ID_TIPO_DOCUMENTO' })
  public idTipoDocumento: SAU_ITEM_LOOKUP | null

  @Column('number', {
    nullable: false,
    unique: true,
    name: 'NR_SEQ_DETALHAMENTO'
  })
  public NR_SEQ_DETALHAMENTO: number

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_DETALHAMENTO'
  })
  public DT_DETALHAMENTO: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_DETALHAMENTO'
  })
  public DS_DETALHAMENTO: string | null

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
