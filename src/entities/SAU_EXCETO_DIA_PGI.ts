import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { SAU_PGI } from './SAU_PGI'

@Entity('SAU_EXCETO_DIA_PGI')
export class SAU_EXCETO_DIA_PGI {
  @ManyToOne(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.sauExcetoDiaPgis,
    { primary: true, nullable: false }
  )
  @JoinColumn({ name: 'CD_PGI' })
  public cdPgi: SAU_PGI | null

  @Column('timestamp with local time zone', {
    nullable: false,
    primary: true,
    name: 'DT_EXCETO_PGI'
  })
  public DT_EXCETO_PGI: Date

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
