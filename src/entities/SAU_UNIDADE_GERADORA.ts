import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { SAU_USINA } from './SAU_USINA'
import { SAU_PGI } from './SAU_PGI'

@Entity('SAU_UNIDADE_GERADORA')
@Index('SAU_UNIDADE_GERADORA_IX1', ['CD_CLASSE_UNIDADE'])
export class SAU_UNIDADE_GERADORA {
  @ManyToOne(
    () => SAU_USINA,
    (SAU_USINA: SAU_USINA) => SAU_USINA.sauUnidadeGeradoras,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_USINA' })
  public cdUsina: SAU_USINA | null

  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_UNIDADE_GERADORA'
  })
  public CD_UNIDADE_GERADORA: number

  @Column('varchar2', {
    nullable: false,
    length: 40,
    name: 'NM_UNIDADE_GERADORA'
  })
  public NM_UNIDADE_GERADORA: string

  @Column('number', {
    nullable: false,
    precision: 1,
    scale: 0,
    name: 'FL_ATIVO'
  })
  public FL_ATIVO: number

  @Column('number', {
    nullable: false,
    precision: 2,
    scale: 0,
    name: 'CD_CLASSE_UNIDADE'
  })
  public CD_CLASSE_UNIDADE: number

  @Column('number', {
    nullable: false,
    precision: 6,
    scale: 3,
    name: 'VL_POTENCIA_NOMINAL_GERADOR'
  })
  public VL_POTENCIA_NOMINAL_GERADOR: number

  @Column('number', {
    nullable: true,
    precision: 6,
    scale: 0,
    name: 'CD_UG_HDOM'
  })
  public CD_UG_HDOM: number | null

  @Column('varchar2', {
    nullable: true,
    length: 50,
    name: 'CD_UG_HDOM_CSV'
  })
  public CD_UG_HDOM_CSV: string | null

  @Column('varchar2', {
    nullable: true,
    length: 20,
    name: 'CD_UG_SAMUG'
  })
  public CD_UG_SAMUG: string | null

  @Column('varchar2', {
    nullable: true,
    length: 20,
    name: 'CD_IMP_GER_BRUTA'
  })
  public CD_IMP_GER_BRUTA: string | null

  @Column('number', {
    nullable: true,
    precision: 6,
    scale: 3,
    name: 'VL_POTENCIA_MINIMA'
  })
  public VL_POTENCIA_MINIMA: number | null

  @Column('number', {
    nullable: true,
    precision: 6,
    scale: 3,
    name: 'VL_POTENCIA_MAXIMA'
  })
  public VL_POTENCIA_MAXIMA: number | null

  @Column('number', {
    nullable: true,
    precision: 6,
    scale: 3,
    name: 'VL_POTENCIA_MINIMA_E'
  })
  public VL_POTENCIA_MINIMA_E: number | null

  @Column('number', {
    nullable: true,
    precision: 6,
    scale: 3,
    name: 'VL_POTENCIA_MAXIMA_E'
  })
  public VL_POTENCIA_MAXIMA_E: number | null

  @Column('date', {
    nullable: true,
    name: 'DT_INICIO_DADOS_SAU'
  })
  public DT_INICIO_DADOS_SAU: Date | null

  @Column('date', {
    nullable: true,
    name: 'DT_INICIO_OPERACAO'
  })
  public DT_INICIO_OPERACAO: Date | null

  @Column('date', {
    nullable: true,
    name: 'DT_INICIO_HDOM'
  })
  public DT_INICIO_HDOM: Date | null

  @Column('date', {
    nullable: false,
    name: 'DT_PRIMEIRO_SINCRONISMO'
  })
  public DT_PRIMEIRO_SINCRONISMO: Date

  @Column('date', {
    nullable: true,
    name: 'DT_PRIMEIRO_GIRO'
  })
  public DT_PRIMEIRO_GIRO: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 50,
    name: 'NM_UG_SUEZ'
  })
  public NM_UG_SUEZ: string | null

  @Column('varchar2', {
    nullable: true,
    length: 15,
    name: 'CD_MAE'
  })
  public CD_MAE: string | null

  @Column('varchar2', {
    nullable: true,
    length: 120,
    name: 'NM_LOCALIZACAO_MANUTENCAO'
  })
  public NM_LOCALIZACAO_MANUTENCAO: string | null

  @Column('number', {
    nullable: true,
    precision: 5,
    scale: 2,
    name: 'VL_GERACAO_MINIMA'
  })
  public VL_GERACAO_MINIMA: number | null

  @Column('number', {
    nullable: true,
    precision: 5,
    scale: 2,
    name: 'VL_GERACAO_MAXIMA'
  })
  public VL_GERACAO_MAXIMA: number | null

  @Column('number', {
    nullable: true,
    precision: 10,
    scale: 2,
    name: 'VL_GERACAO_MIN_PROG'
  })
  public VL_GERACAO_MIN_PROG: number | null

  @Column('number', {
    nullable: true,
    precision: 10,
    scale: 2,
    name: 'VL_GERACAO_MAX_PROG'
  })
  public VL_GERACAO_MAX_PROG: number | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'USER_CREATE'
  })
  public USER_CREATE: string | null

  @Column('date', {
    nullable: true,
    name: 'DATE_CREATE'
  })
  public DATE_CREATE: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'USER_UPDATE'
  })
  public USER_UPDATE: string | null

  @Column('date', {
    nullable: true,
    name: 'DATE_UPDATE'
  })
  public DATE_UPDATE: Date | null

  @Column('varchar2', {
    nullable: false,
    unique: true,
    length: 14,
    name: 'SG_UNIDADE_GERADORA'
  })
  public SG_UNIDADE_GERADORA: string

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.cdUnidadeGeradora
  )
  public sauPgis: SAU_PGI[]
}
