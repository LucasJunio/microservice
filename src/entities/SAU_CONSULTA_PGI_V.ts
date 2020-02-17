import { Column, Entity } from 'typeorm'

@Entity('SAU_CONSULTA_PGI_V')
export class SAU_CONSULTA_PGI_V {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_PGI'
  })
  public CD_PGI: number

  @Column('varchar2', {
    nullable: true,
    length: 50,
    name: 'CONJUNTO_USINA'
  })
  public CONJUNTO_USINA: string | null

  @Column('varchar2', {
    nullable: true,
    length: 14,
    name: 'UNIDADE_GERADORA'
  })
  public UNIDADE_GERADORA: string | null

  @Column('varchar2', {
    nullable: false,
    length: 50,
    name: 'NUM_PGI'
  })
  public NUM_PGI: string

  @Column('number', {
    nullable: true,
    name: 'NR_NUM_PGI'
  })
  public NR_NUM_PGI: string

  @Column('number', {
    nullable: true,
    name: 'ANO_NUM_PGI'
  })
  public ANO_NUM_PGI: string

  @Column('varchar2', {
    nullable: true,
    length: 20,
    name: 'NUM_DOC_EXTERNO'
  })
  public NUM_DOC_EXTERNO: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_INICIO_PREVISTO'
  })
  public DT_INICIO_PREVISTO: Date | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_FIM_PREVISTO'
  })
  public DT_FIM_PREVISTO: Date | null

  @Column('varchar2', {
    nullable: false,
    length: 400,
    name: 'SITUACAO'
  })
  public SITUACAO: string

  @Column('number', {
    nullable: true,
    name: 'NR_PARADA'
  })
  public NR_PARADA: number | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_SERVICO'
  })
  public DS_SERVICO: string
}
