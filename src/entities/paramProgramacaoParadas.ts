import { Column, Entity } from 'typeorm'

@Entity('SAU_PARAM_PROGRAMACAO_PARADAS')
export class ParamProgramacaoParadas {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_PARAM_PROGRAMACAO_PARADAS'
  })
  public CD_PARAM_PROGRAMACAO_PARADAS: number

  @Column('timestamp with local time zone', {
    nullable: false,
    unique: true,
    name: 'DT_ANO'
  })
  public DT_ANO: Date

  @Column('number', {
    nullable: true,
    name: 'NR_ANOS_PARADA_LONGO_PRAZO'
  })
  public NR_ANOS_PARADA_LONGO_PRAZO: number | null

  @Column('number', {
    nullable: true,
    name: 'NR_PRAZO_PARADA_BIENAL'
  })
  public NR_PRAZO_PARADA_BIENAL: number | null

  @Column('number', {
    nullable: true,
    name: 'NR_HORIZONTE_LONGO_PRAZO'
  })
  public NR_HORIZONTE_LONGO_PRAZO: number | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_FINAL_PARADAS_ANUAIS'
  })
  public DT_FINAL_PARADAS_ANUAIS: Date | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_FINAL_APROVACAO'
  })
  public DT_FINAL_APROVACAO: Date | null

  @Column('number', {
    nullable: true,
    name: 'NR_PRAZO_AJUSTE_PARADA_ANUAL'
  })
  public NR_PRAZO_AJUSTE_PARADA_ANUAL: number | null

  @Column('number', {
    nullable: true,
    name: 'NR_PRAZO_PARADA_URGENTE'
  })
  public NR_PRAZO_PARADA_URGENTE: number | null

  @Column('number', {
    nullable: true,
    name: 'NR_PRAZO_REPROGRAMACAO'
  })
  public NR_PRAZO_REPROGRAMACAO: number | null

  @Column('number', {
    nullable: true,
    name: 'NR_PRAZO_EMISSAO_PGI'
  })
  public NR_PRAZO_EMISSAO_PGI: number | null

  @Column('number', {
    nullable: true,
    name: 'NR_HORAS_MINIMA_PARADA'
  })
  public NR_HORAS_MINIMA_PARADA: number | null

  @Column('number', {
    name: 'NR_MIN_URG_INTEMPST',
    nullable: true
  })
  public NR_MIN_URG_INTEMPST: number | null

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
