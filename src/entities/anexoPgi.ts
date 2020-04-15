import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Pgi } from './pgi'

@Entity('SAU_ANEXO_PGI')
export class AnexoPgi {
  @ManyToOne(
    () => Pgi,
    (SAU_PGI: Pgi) => SAU_PGI.sauAnexoPgis,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_PGI' })
  public cdPgi: Pgi | null

  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_SEQ_ANEXO'
  })
  public CD_SEQ_ANEXO: number

  @Column('varchar2', {
    nullable: true,
    length: 500,
    name: 'DS_ANEXO_FILENAME'
  })
  public DS_ANEXO_FILENAME: string | null

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

  @Column('varchar2', {
    nullable: true,
    length: 500,
    name: 'ID_ARQUIVO'
  })
  public ID_ARQUIVO: string | null
}
