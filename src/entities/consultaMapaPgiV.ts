import { Column, Entity } from 'typeorm'

@Entity('SAU_MAPA_PGI_V')
export class ConsultaMapaPgiV {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_PGI'
  })
  public CD_PGI: number

  @Column('varchar2', {
    nullable: false,
    length: 1,
    name: 'ID_CONJUNTO_USINA'
  })
  public ID_CONJUNTO_USINA: string | null

  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_CONJUNTO_USINA'
  })
  public CD_CONJUNTO_USINA: number

  @Column('varchar2', {
    nullable: true,
    length: 50,
    name: 'SG_CONJUNTO_USINA'
  })
  public SG_CONJUNTO_USINA: string | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'TIPO_USINA'
  })
  public TIPO_USINA: string | null

  @Column('number', {
    nullable: true,
    name: 'CD_UNIDADE_GERADORA'
  })
  public CD_UNIDADE_GERADORA: number | null

  @Column('varchar2', {
    nullable: true,
    length: 14,
    name: 'SG_UNIDADE_GERADORA'
  })
  public SG_UNIDADE_GERADORA: string | null

  @Column('varchar2', {
    nullable: true,
    length: 50,
    name: 'NUM_PGI'
  })
  public NUM_PGI: string | null

  @Column('timestamp with local time zone', {
    nullable: false,
    name: 'DT_INICIO_PREVISTO'
  })
  public DT_INICIO_PREVISTO: Date | null

  @Column('timestamp with local time zone', {
    nullable: false,
    name: 'DT_FIM_PREVISTO'
  })
  public DT_FIM_PREVISTO: Date | null

  @Column('number', {
    nullable: true,
    name: 'ID_STATUS'
  })
  public ID_STATUS: number | null

  @Column('varchar2', {
    nullable: true,
    length: 14,
    name: 'SG_STATUS'
  })
  public SG_STATUS: string | null

  @Column('varchar2', {
    nullable: true,
    length: 50,
    name: 'DS_STATUS'
  })
  public DS_STATUS: string | null

  @Column('number', {
    nullable: true,
    name: 'CD_PROGRAMACAO_PARADA'
  })
  public CD_PROGRAMACAO_PARADA: number | null

  @Column('varchar2', {
    nullable: true,
    length: 1,
    name: 'ID_RESTRICAO'
  })
  public ID_RESTRICAO: string | null

  @Column('timestamp with local time zone', {
    nullable: false,
    name: 'DT_INICIO'
  })
  public DT_INICIO: Date | null

  @Column('timestamp with local time zone', {
    nullable: false,
    name: 'DT_FIM'
  })
  public DT_FIM: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_DESP_ONS_AGENTE_INICIO'
  })
  public NM_DESP_ONS_AGENTE_INICIO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_COS_INICIO'
  })
  public NM_OPERADOR_COS_INICIO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_USINA_INICIO'
  })
  public NM_OPERADOR_USINA_INICIO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_DESP_ONS_AGENTE_FIM'
  })
  public NM_DESP_ONS_AGENTE_FIM: string | null

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
    length: 20,
    name: 'NUM_DOC_EXTERNO'
  })
  public NUM_DOC_EXTERNO: string | null

  @Column('number', {
    nullable: true,
    name: 'ORDEM_USINA'
  })
  public ORDEM_USINA: number | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'REGIONAL_USINA'
  })
  public REGIONAL_USINA: string | null
}
