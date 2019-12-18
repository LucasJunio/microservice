import { Column, Entity, Index, OneToMany } from 'typeorm'
import { SAU_AGRUP_CONJUNTO_USINA } from './SAU_AGRUP_CONJUNTO_USINA'
import { SAU_ATIVIDADE_ONS } from './SAU_ATIVIDADE_ONS'
import { SAU_UNIDADE_GERADORA } from './SAU_UNIDADE_GERADORA'

@Entity('SAU_USINA')
@Index('SAU_USINA_IX1', ['CD_EMPRESA_VINCULADA'])
export class SAU_USINA {
  @Column('date', {
    nullable: true,
    name: 'DT_CERTIFICACAO'
  })
  public DT_CERTIFICACAO: Date | null

  @Column('number', {
    nullable: true,
    precision: 10,
    scale: 0,
    name: 'CD_EMPRESA_VINCULADA'
  })
  public CD_EMPRESA_VINCULADA: number | null

  @Column('number', {
    nullable: true,
    precision: 10,
    scale: 0,
    name: 'CD_AGENTE_MAE'
  })
  public CD_AGENTE_MAE: number | null

  @Column('varchar2', {
    nullable: true,
    length: 15,
    name: 'CD_MAE'
  })
  public CD_MAE: string | null

  @Column('varchar2', {
    nullable: true,
    length: 15,
    name: 'ID_SUBMERCADO'
  })
  public ID_SUBMERCADO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 1,
    name: 'ID_PARTIC_PERDAS'
  })
  public ID_PARTIC_PERDAS: string | null

  @Column('varchar2', {
    nullable: true,
    length: 1,
    name: 'ID_PARTIC_MRE'
  })
  public ID_PARTIC_MRE: string | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_TRANSFERENCIA'
  })
  public FL_TRANSFERENCIA: number | null

  @Column('varchar2', {
    nullable: true,
    length: 20,
    name: 'SG_ONS'
  })
  public SG_ONS: string | null

  @Column('varchar2', {
    nullable: true,
    length: 1,
    name: 'ID_USINA_EXPORT'
  })
  public ID_USINA_EXPORT: string | null

  @Column('number', {
    nullable: true,
    name: 'CD_SINERCOM'
  })
  public CD_SINERCOM: number | null

  @Column('varchar2', {
    nullable: true,
    length: 20,
    name: 'CD_CLASSE_SINERCOM'
  })
  public CD_CLASSE_SINERCOM: string | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    precision: 1,
    scale: 0,
    name: 'FL_PROGRAMA_GERACAO'
  })
  public FL_PROGRAMA_GERACAO: number | null

  @Column('number', {
    nullable: true,
    precision: 10,
    scale: 2,
    name: 'VL_COEFICIENTE_A'
  })
  public VL_COEFICIENTE_A: number | null

  @Column('number', {
    nullable: true,
    precision: 10,
    scale: 2,
    name: 'VL_COEFICIENTE_B'
  })
  public VL_COEFICIENTE_B: number | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'SG_POS_OPERACAO'
  })
  public SG_POS_OPERACAO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 5,
    name: 'DS_COMBUSTIVEL_GCE'
  })
  public DS_COMBUSTIVEL_GCE: string | null

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

  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_USINA'
  })
  public CD_USINA: number

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null

  @Column('varchar2', {
    nullable: false,
    unique: true,
    length: 14,
    name: 'SG_USINA'
  })
  public SG_USINA: string

  @Column('varchar2', {
    nullable: false,
    length: 50,
    name: 'NM_USIMA'
  })
  public NM_USIMA: string

  @Column('number', {
    nullable: false,
    precision: 1,
    scale: 0,
    name: 'FL_ATIVO'
  })
  public FL_ATIVO: number

  @Column('varchar2', {
    nullable: false,
    length: 6,
    name: 'ID_TIPO_USINA'
  })
  public ID_TIPO_USINA: string

  @Column('varchar2', {
    nullable: true,
    length: 15,
    name: 'ID_REGIONAL'
  })
  public ID_REGIONAL: string | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_ALTERNATIVA'
  })
  public FL_ALTERNATIVA: number | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_CALCULA_DISPO_ISO'
  })
  public FL_CALCULA_DISPO_ISO: number | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_GERACAO_TM'
  })
  public FL_GERACAO_TM: number | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_CONSUMO_TM'
  })
  public FL_CONSUMO_TM: number | null

  @Column('number', {
    nullable: true,
    precision: 6,
    scale: 0,
    name: 'CD_USINA_HDOM'
  })
  public CD_USINA_HDOM: number | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'CD_USINA_SAMUG'
  })
  public CD_USINA_SAMUG: string | null

  @Column('varchar2', {
    nullable: true,
    length: 50,
    name: 'CD_USINA_HDOM_CSV'
  })
  public CD_USINA_HDOM_CSV: string | null

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_NOTIFICACAO_RO'
  })
  public FL_NOTIFICACAO_RO: number | null

  @Column('date', {
    nullable: true,
    name: 'DT_INICIO_NOTIFICACAO'
  })
  public DT_INICIO_NOTIFICACAO: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'NM_LONGO'
  })
  public NM_LONGO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 50,
    name: 'NM_USINA_SUEZ'
  })
  public NM_USINA_SUEZ: string | null

  @Column('varchar2', {
    nullable: true,
    length: 50,
    name: 'NM_APRESENTACAO'
  })
  public NM_APRESENTACAO: string | null

  @Column('number', {
    nullable: true,
    precision: 10,
    scale: 3,
    name: 'VL_CAPACID_NOMINAL'
  })
  public VL_CAPACID_NOMINAL: number | null

  @Column('number', {
    nullable: true,
    precision: 10,
    scale: 3,
    name: 'VL_CAPACID_NOMINAL_ENGIE'
  })
  public VL_CAPACID_NOMINAL_ENGIE: number | null

  @Column('number', {
    nullable: true,
    precision: 10,
    scale: 3,
    name: 'VL_GARANTIA_FISICA'
  })
  public VL_GARANTIA_FISICA: number | null

  @Column('number', {
    nullable: true,
    precision: 4,
    scale: 0,
    name: 'CD_RIO'
  })
  public CD_RIO: number | null

  @Column('number', {
    nullable: true,
    precision: 8,
    scale: 0,
    name: 'NR_CEP'
  })
  public NR_CEP: number | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'DS_ENDERECO'
  })
  public DS_ENDERECO: string | null

  @Column('number', {
    nullable: true,
    precision: 8,
    scale: 0,
    name: 'CD_CIDADE'
  })
  public CD_CIDADE: number | null

  @Column('varchar2', {
    nullable: false,
    length: 2,
    name: 'SG_UF'
  })
  public SG_UF: string

  @Column('varchar2', {
    nullable: true,
    length: 15,
    name: 'DS_LATITUDE'
  })
  public DS_LATITUDE: string | null

  @Column('varchar2', {
    nullable: true,
    length: 15,
    name: 'DS_LONGITUDE'
  })
  public DS_LONGITUDE: string | null

  @Column('varchar2', {
    nullable: true,
    length: 100,
    name: 'ID_STATUS_USINA'
  })
  public ID_STATUS_USINA: string | null

  @Column('date', {
    nullable: true,
    name: 'DT_DESATIVACAO'
  })
  public DT_DESATIVACAO: Date | null

  @Column('date', {
    nullable: true,
    name: 'DT_AQUISICAO'
  })
  public DT_AQUISICAO: Date | null

  @Column('date', {
    nullable: true,
    name: 'DT_OPERACAO_COMERCIAL'
  })
  public DT_OPERACAO_COMERCIAL: Date | null

  @OneToMany(
    () => SAU_AGRUP_CONJUNTO_USINA,
    (SAU_AGRUP_CONJUNTO_USINA: SAU_AGRUP_CONJUNTO_USINA) => SAU_AGRUP_CONJUNTO_USINA.cdUsina
  )
  public sauAgrupConjuntoUsinas: SAU_AGRUP_CONJUNTO_USINA[]

  @OneToMany(
    () => SAU_ATIVIDADE_ONS,
    (SAU_ATIVIDADE_ONS: SAU_ATIVIDADE_ONS) => SAU_ATIVIDADE_ONS.cdUsina
  )
  public sauAtividadeOnss: SAU_ATIVIDADE_ONS[]

  @OneToMany(
    () => SAU_UNIDADE_GERADORA,
    (SAU_UNIDADE_GERADORA: SAU_UNIDADE_GERADORA) => SAU_UNIDADE_GERADORA.cdUsina
  )
  public sauUnidadeGeradoras: SAU_UNIDADE_GERADORA[]
}
