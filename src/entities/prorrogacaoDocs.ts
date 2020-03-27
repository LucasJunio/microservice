import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { TemLookup } from './temLookup'

@Entity('SAU_PRORROGACAO_DOCS')
export class ProrrogacaoDocs {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_PRORROGACAO_DOCS'
  })
  public CD_PRORROGACAO_DOCS: number

  @Column('number', {
    nullable: false,
    name: 'CD_DOCUMENTO'
  })
  public CD_DOCUMENTO: number

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauProrrogacaoDocss,
    { nullable: false }
  )
  @JoinColumn({ name: 'ID_TIPO_DOCUMENTO' })
  public idTipoDocumento: TemLookup | null

  @Column('timestamp with local time zone', {
    nullable: false,
    name: 'DT_PRORROGACAO'
  })
  public DT_PRORROGACAO: Date

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_DESPACHANTE_ONS_AGENTE'
  })
  public NM_DESPACHANTE_ONS_AGENTE: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_COS'
  })
  public NM_OPERADOR_COS: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_USINA'
  })
  public NM_OPERADOR_USINA: string | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_MOTIVO_PRORROGACAO'
  })
  public DS_MOTIVO_PRORROGACAO: string | null

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
