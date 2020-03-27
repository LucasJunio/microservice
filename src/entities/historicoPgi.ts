import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Pgi } from './pgi'

@Entity('SAU_HISTORICO_PGI')
export class HistoricoPgi {
  @ManyToOne(
    () => Pgi,
    (SAU_PGI: Pgi) => SAU_PGI.sauHistoricoPgis,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_PGI' })
  public cdPgi: Pgi | null

  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_HISTORICO'
  })
  public CD_HISTORICO: number

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_HISTORICO'
  })
  public DT_HISTORICO: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'CD_USUARIO'
  })
  public CD_USUARIO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_ACAO'
  })
  public DS_ACAO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_OBSERVACAO'
  })
  public DS_OBSERVACAO: string | null

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
