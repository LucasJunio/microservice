import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { SAU_ITEM_LOOKUP } from './SAU_ITEM_LOOKUP'

@Entity('SAU_EXECUCAO_DIARIA_DOCS')
export class SAU_EXECUCAO_DIARIA_DOCS {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_EXECUCAO_DIARIA_DOCS'
  })
  public CD_EXECUCAO_DIARIA_DOCS: number

  @Column('number', {
    nullable: false,
    unique: true,
    name: 'CD_DOCUMENTO'
  })
  public CD_DOCUMENTO: number

  @ManyToOne(
    () => SAU_ITEM_LOOKUP,
    (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP) => SAU_ITEM_LOOKUP.sauExecucaoDiariaDocss,
    { nullable: false }
  )
  @JoinColumn({ name: 'ID_TIPO_DOCUMENTO' })
  public idTipoDocumento: SAU_ITEM_LOOKUP | null

  @Column('number', {
    nullable: false,
    unique: true,
    name: 'NR_SEQ_EXECUCAO'
  })
  public NR_SEQ_EXECUCAO: number

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_INICIO'
  })
  public DT_INICIO: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_DESPACHANTE_ONS_AGENTE_INI'
  })
  public NM_DESPACHANTE_ONS_AGENTE_INI: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_COS_INI'
  })
  public NM_OPERADOR_COS_INI: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_USINA_INI'
  })
  public NM_OPERADOR_USINA_INI: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DATA_FIM'
  })
  public DATA_FIM: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_DESPACHANTE_ONS_AGENTE_FIM'
  })
  public NM_DESPACHANTE_ONS_AGENTE_FIM: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_COS_FIM'
  })
  public NM_OPERADOR_COS_FIM: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_USINA_FIM'
  })
  public NM_OPERADOR_USINA_FIM: string | null

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
