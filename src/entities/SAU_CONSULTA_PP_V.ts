import { Column, Entity } from 'typeorm'

@Entity('SAU_CONSULTA_PP_V')
export class SAU_CONSULTA_PP_V {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_PROGRAMACAO_PARADA'
  })
  public CD_PROGRAMACAO_PARADA: number

  @Column('number', {
    nullable: false,
    name: 'CD_CONJUNTO_USINA'
  })
  public CD_CONJUNTO_USINA: number | null

  @Column('varchar2', {
    nullable: true,
    length: 50,
    name: 'SG_CONJUNTO_USINA'
  })
  public SG_CONJUNTO_USINA: string | null

  @Column('number', {
    nullable: false,
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
    name: 'CD_PARADA'
  })
  public CD_PARADA: number | null

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

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_HORA_INICIO_PROGRAMACAO'
  })
  public DT_HORA_INICIO_PROGRAMACAO: Date | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_HORA_TERMINO_PROGRAMACAO'
  })
  public DT_HORA_TERMINO_PROGRAMACAO: Date | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_CRIACAO_PARADA'
  })
  public DT_CRIACAO_PARADA: Date | null
}
