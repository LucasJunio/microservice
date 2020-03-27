import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Pgi } from './pgi'

@Entity('SAU_REPROGRAMACAO_PGI')
export class ReprogramacaoPgi {
  public static STATUS_SOLICITADA = 'SOLICITADA'
  public static STATUS_ACEITA = 'ACEITA'
  public static STATUS_NEGADA = 'NEGADA'

  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_REPROGRAMACAO_PGI'
  })
  public CD_REPROGRAMACAO_PGI: number

  @ManyToOne(
    () => Pgi,
    (SAU_PGI: Pgi) => SAU_PGI.sauReprogramacaoPgis,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_PGI' })
  public cdPgi: Pgi | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_INICIO_REPROG'
  })
  public DT_INICIO_REPROG: Date | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_FIM_REPROG'
  })
  public DT_FIM_REPROG: Date | null

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
  public DS_MOTIVO_REPROG: string | null

  @Column('varchar2', {
    nullable: true,
    length: 20,
    name: 'ID_STATUS'
  })
  public ID_STATUS: string | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    precision: 1,
    scale: 0,
    name: 'FL_GERADO_SGI_XML'
  })
  public FL_GERADO_SGI_XML: number | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DATE_CREATE'
  })
  public DATE_CREATE: Date | null

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
}
