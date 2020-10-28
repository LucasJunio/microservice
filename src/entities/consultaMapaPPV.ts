import { Column, Entity } from 'typeorm'

@Entity('SAU_MAPA_PARADA_PP_V')
export class ConsultaMapaPPV {
  public dtHistoricaObj: any

  @Column('number', {
    nullable: true,
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

  @Column('number', {
    nullable: false,
    name: 'VL_POTENCIA_INSTALADA'
  })
  public VL_POTENCIA_INSTALADA: number | null

  @Column('number', {
    nullable: false,
    name: 'CD_PROGRAMACAO_PARADA'
  })
  public CD_PROGRAMACAO_PARADA: number | null

  @Column('timestamp with local time zone', {
    nullable: false,
    name: 'DT_HORA_INICIO_PROGRAMACAO'
  })
  public DT_HORA_INICIO_PROGRAMACAO: Date | null

  @Column('timestamp with local time zone', {
    nullable: false,
    name: 'DT_HORA_TERMINO_PROGRAMACAO'
  })
  public DT_HORA_TERMINO_PROGRAMACAO: Date | null

  @Column('number', {
    nullable: true,
    name: 'DURACAO_PREVISTA'
  })
  public DURACAO_PREVISTA: number | null

  @Column('varchar2', {
    nullable: false,
    length: 240,
    name: 'DS_PROGRAMACAO_PARADA'
  })
  public DS_PROGRAMACAO_PARADA: string | null

  @Column('number', {
    nullable: true,
    name: 'ID_TIPO_PARADA'
  })
  public ID_TIPO_PARADA: number | null

  @Column('varchar2', {
    nullable: false,
    length: 30,
    name: 'TIPO_PARADA'
  })
  public TIPO_PARADA: string | null

  @Column('varchar2', {
    nullable: false,
    length: 400,
    name: 'DS_TIPO_PARADA'
  })
  public DS_TIPO_PARADA: string | null

  @Column('varchar2', {
    nullable: false,
    length: 1,
    name: 'ID_STATUS_PROGRAMACAO'
  })
  public ID_STATUS_PROGRAMACAO: string | null

  @Column('number', {
    nullable: true,
    name: 'ID_STATUS'
  })
  public ID_STATUS: number | null

  @Column('varchar2', {
    nullable: false,
    length: 30,
    name: 'STATUS_PARADA'
  })
  public STATUS_PARADA: string | null

  @Column('varchar2', {
    nullable: false,
    length: 400,
    name: 'DS_STATUS_PARADA'
  })
  public DS_STATUS_PARADA: string | null

  @Column('varchar2', {
    nullable: false,
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

  @Column('number', {
    nullable: true,
    name: 'DURACAO_EXECUCAO'
  })
  public DURACAO_EXECUCAO: number | null

  @Column('varchar2', {
    nullable: false,
    length: 500,
    name: 'DS_SERVICO_EXECUTADO'
  })
  public DS_SERVICO_EXECUTADO: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_CRIACAO_PARADA'
  })
  public DT_CRIACAO_PARADA: Date | null

  @Column('number', {
    nullable: true,
    name: 'ID_STATUS_REPROGRAMACAO'
  })
  public ID_STATUS_REPROGRAMACAO: number | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'STATUS_PARADA_REPROG'
  })
  public STATUS_PARADA_REPROG: string | null

  @Column('varchar2', {
    nullable: true,
    length: 400,
    name: 'DS_STATUS_PARADA_REPROG'
  })
  public DS_STATUS_PARADA_REPROG: string | null

  @Column('number', {
    nullable: true,
    name: 'ID_STATUS_CANCELAMENTO'
  })
  public ID_STATUS_CANCELAMENTO: number | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'STATUS_PARADA_CANC'
  })
  public STATUS_PARADA_CANC: string | null

  @Column('varchar2', {
    nullable: true,
    length: 400,
    name: 'DS_STATUS_PARADA_CANC'
  })
  public DS_STATUS_PARADA_CANC: string | null

  @Column('varchar2', {
    nullable: true,
    length: 400,
    name: 'DS_CLASSIFICACAO_PARADA'
  })
  public DS_CLASSIFICACAO_PARADA: string | null

  @Column('varchar2', {
    nullable: true,
    length: 400,
    name: 'DS_SUBCLASSIFICACAO_PARADA'
  })
  public DS_SUBCLASSIFICACAO_PARADA: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_PRORROGACAO_PGI'
  })
  public DT_PRORROGACAO_PGI: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 1,
    name: 'ID_ATUAL_HISTORICO'
  })
  public ID_ATUAL_HISTORICO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 70,
    name: 'DS_MOTIVO_CANCELAMENTO'
  })
  public DS_MOTIVO_CANCELAMENTO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'CD_PGI'
  })
  public CD_PGI: string | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'NUM_PGI'
  })
  public NUM_PGI: string | null

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

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_INICIO_REPROG'
  })
  public DT_INICIO_REPROG: Date | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_FIM_REPROG'
  })
  public DT_FIM_REPROG: Date | null
}
