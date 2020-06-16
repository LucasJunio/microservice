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
}
