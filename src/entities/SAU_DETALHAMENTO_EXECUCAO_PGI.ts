import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { SAU_PGI } from './SAU_PGI'

@Entity('SAU_DETALHAMENTO_EXECUCAO_PGI')
export class SAU_DETALHAMENTO_EXECUCAO_PGI {
  @ManyToOne(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.sauDetalhamentoExecucaoPgis,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_PGI' })
  public cdPgi: SAU_PGI | null

  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_DETALHE_EXECUCAO_PGI'
  })
  public CD_DETALHE_EXECUCAO_PGI: number

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

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DATE_CREATE'
  })
  public DATE_CREATE: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'USER_CREATE'
  })
  public USER_CREATE: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DATE_UPDATE'
  })
  public DATE_UPDATE: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'USER_UPDATE'
  })
  public USER_UPDATE: string | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null
}
