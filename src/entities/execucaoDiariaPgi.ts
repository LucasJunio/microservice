import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Pgi } from './pgi'

@Entity('SAU_EXECUCAO_DIARIA_PGI')
export class ExecucaoDiariaPgi {
  @ManyToOne(
    () => Pgi,
    (SAU_PGI: Pgi) => SAU_PGI.sauExecucaoDiariaPgis,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_PGI' })
  public cdPgi: Pgi | null

  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_EXECUCAO_DIARIA_PGI'
  })
  public CD_EXECUCAO_DIARIA_PGI: number

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_INICIO'
  })
  public DT_INICIO: Date | null

  @Column('number', {
    nullable: true,
    name: 'NR_ETAPA'
  })
  public NR_ETAPA: number | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_DESP_ONS_AGENTE_INICIO'
  })
  public NM_DESP_ONS_AGENTE_INICIO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_COS_INICIO'
  })
  public NM_OPERADOR_COS_INICIO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_USINA_INICIO'
  })
  public NM_OPERADOR_USINA_INICIO: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_FIM'
  })
  public DT_FIM: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_DESP_ONS_AGENTE_FIM'
  })
  public NM_DESP_ONS_AGENTE_FIM: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_COS_FIM'
  })
  public NM_OPERADOR_COS_FIM: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_OPERADOR_USINA_FIM'
  })
  public NM_OPERADOR_USINA_FIM: string | null

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
