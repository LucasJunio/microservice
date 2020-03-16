import { Column, Entity, JoinColumn } from 'typeorm'
import { SAU_PGI } from './SAU_PGI'

@Entity('SAU_NEGOCIACAO_ONS_PGI')
export class SAU_NEGOCIACAO_ONS_PGI {
  // @ManyToOne(
  //   () => SAU_PGI,
  //   (SAU_PGI: SAU_PGI) => SAU_PGI.sauNegociacaoOnsPgis,
  //   { nullable: false }
  // )
  @JoinColumn({ name: 'CD_PGI' })
  public cdPgi: SAU_PGI | null

  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_NEGOCIACAO'
  })
  public CD_NEGOCIACAO: number

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_HORA'
  })
  public DT_HORA: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_NEGOCIACAO'
  })
  public DS_NEGOCIACAO: string | null

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
