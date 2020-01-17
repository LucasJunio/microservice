import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { SAU_PGI } from './SAU_PGI'

@Entity('SAU_ANEXO_PGI')
export class Anexo {
  @PrimaryColumn({ name: 'CD_SEQ_ANEXO' })
  public id: number

  @PrimaryColumn({ name: 'CD_PGI' })
  public codigoPgi: number

  @ManyToOne(
    () => SAU_PGI,
    (pgi: SAU_PGI) => pgi.sauAnexoPgis,
    { primary: true, nullable: false }
  )
  @JoinColumn({ name: 'CD_PGI' })
  public pgi: SAU_PGI | null

  @Column('varchar2', {
    nullable: true,
    length: 500,
    name: 'ID_ARQUIVO'
  })
  public idArquivo: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'DS_ANEXO_FILENAME'
  })
  public nomeArquivo: string | null

  @Column('timestamp', {
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

  @Column('timestamp', {
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
