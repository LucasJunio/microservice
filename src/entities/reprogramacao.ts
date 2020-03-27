import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Pgi } from './pgi'

@Entity('SAU_REPROGRAMACAO_PGI')
export class Reprogramacao {
  public static STATUS_RASCUNHO = 'RASCUNHO'
  public static STATUS_SOLICITADA = 'SOLICITADA'
  public static STATUS_ACEITA = 'ACEITA'
  public static STATUS_NEGADA = 'NEGADA'

  @PrimaryGeneratedColumn('increment', { name: 'CD_REPROGRAMACAO_PGI' })
  public id: number

  @ManyToOne(
    () => Pgi,
    (pgi: Pgi) => pgi.sauReprogramacaoPgis,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_PGI' })
  public pgi: Pgi | null

  @Column('timestamp', {
    nullable: true,
    name: 'DT_INICIO_REPROG'
  })
  public dataInicio: Date | null

  @Column('timestamp', {
    nullable: true,
    name: 'DT_FIM_REPROG'
  })
  public dataTermino: Date | null

  @Column('varchar2', {
    nullable: true,
    name: 'CD_USUARIO'
  })
  public CD_USUARIO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_MOTIVO_REPROG'
  })
  public motivo: string | null

  @Column('varchar2', {
    nullable: true,
    length: 20,
    name: 'ID_STATUS'
  })
  public status: string | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    precision: 1,
    scale: 0,
    name: 'FL_GERADO_SGI_XML'
  })
  public FL_GERADO_SGI_XML: number | null

  @Column('timestamp', {
    nullable: true,
    name: 'DATE_CREATE'
  })
  public dateCreate: Date | null

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

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'USER_CREATE'
  })
  public USER_CREATE: string | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null

  public cdPgi: number | null
}
