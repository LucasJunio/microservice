import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId
} from 'typeorm'
import { SAU_CLASSIFICACAO_PARADA } from './SAU_CLASSIFICACAO_PARADA'
import { SAU_PGI } from './SAU_PGI'

@Entity('SAU_PROGRAMACAO_PARADA')
@Index('SAU_PROGRAMACAO_PARADA_IX1', ['CD_USINA', 'DT_HORA_INICIO_REPROGRAMACAO'])
export class SAU_PROGRAMACAO_PARADA {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_PROGRAMACAO_PARADA'
  })
  public CD_PROGRAMACAO_PARADA: number

  @Column('number', {
    nullable: false,
    unique: true,
    name: 'CD_PARADA'
  })
  public CD_PARADA: number

  @Column('number', {
    nullable: false,
    unique: true,
    name: 'CD_SEQ_PARADA'
  })
  public CD_SEQ_PARADA: number

  @Column('number', {
    nullable: false,
    unique: true,
    name: 'CD_USINA'
  })
  public CD_USINA: number

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_CRIACAO_PARADA'
  })
  public DT_CRIACAO_PARADA: Date | null

  @Column('number', {
    nullable: true,
    name: 'ID_TIPO_PARADA'
  })
  public ID_TIPO_PARADA: number | null

  @Column('number', {
    nullable: true,
    name: 'ID_STATUS'
  })
  public ID_STATUS: number | null

  @Column('timestamp with local time zone', {
    nullable: false,
    name: 'DT_HORA_INICIO_PROGRAMACAO'
  })
  public DT_HORA_INICIO_PROGRAMACAO: Date

  @Column('timestamp with local time zone', {
    nullable: false,
    name: 'DT_HORA_TERMINO_PROGRAMACAO'
  })
  public DT_HORA_TERMINO_PROGRAMACAO: Date

  @Column('number', {
    nullable: true,
    name: 'ID_TIPO_PROGRAMACAO'
  })
  public ID_TIPO_PROGRAMACAO: number | null

  @Column('varchar2', {
    nullable: true,
    length: 15,
    name: 'NM_AREA_ORIGEM'
  })
  public NM_AREA_ORIGEM: string | null

  @ManyToOne(
    () => SAU_CLASSIFICACAO_PARADA,
    (SAU_CLASSIFICACAO_PARADA: SAU_CLASSIFICACAO_PARADA) => SAU_CLASSIFICACAO_PARADA.sauProgramacaoParadas,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_CLASSIFICACAO_PROGR_PARADA' })
  public cdClassificacaoProgrParada: SAU_CLASSIFICACAO_PARADA | null

  @Column('number', {
    nullable: true,
    precision: 10,
    scale: 0,
    name: 'CD_SUBCLASSIF_PROGR_PARADA'
  })
  public CD_SUBCLASSIF_PROGR_PARADA: number | null

  @Column('varchar2', {
    nullable: true,
    length: 240,
    name: 'DS_PROGRAMACAO_PARADA'
  })
  public DS_PROGRAMACAO_PARADA: string | null

  @Column('varchar2', {
    nullable: true,
    length: 2500,
    name: 'DS_OBSERVACAO'
  })
  public DS_OBSERVACAO: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_HORA_INICIO_SERVICO'
  })
  public DT_HORA_INICIO_SERVICO: Date | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_HORA_TERMINO_SERVICO'
  })
  public DT_HORA_TERMINO_SERVICO: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 500,
    name: 'DS_SERVICO_EXECUTADO'
  })
  public DS_SERVICO_EXECUTADO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 50,
    name: 'DS_NUM_CEL_ANEEL'
  })
  public DS_NUM_CEL_ANEEL: string | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    precision: 1,
    scale: 0,
    name: 'FL_COMUNICAR_ANEEL'
  })
  public FL_COMUNICAR_ANEEL: number | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_CANCELAMENTO'
  })
  public DT_CANCELAMENTO: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 70,
    name: 'DS_MOTIVO_CANCELAMENTO'
  })
  public DS_MOTIVO_CANCELAMENTO: string | null

  @Column('number', {
    nullable: true,
    name: 'ID_STATUS_CANCELAMENTO'
  })
  public ID_STATUS_CANCELAMENTO: number | null

  @Column('varchar2', {
    nullable: true,
    length: 15,
    name: 'NM_AREA_ORIGEM_CANCELAMENTO'
  })
  public NM_AREA_ORIGEM_CANCELAMENTO: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_HORA_INICIO_REPROGRAMACAO'
  })
  public DT_HORA_INICIO_REPROGRAMACAO: Date | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_HORA_TERMINO_REPROGRAMACAO'
  })
  public DT_HORA_TERMINO_REPROGRAMACAO: Date | null

  @Column('number', {
    nullable: true,
    name: 'ID_STATUS_REPROGRAMACAO'
  })
  public ID_STATUS_REPROGRAMACAO: number | null

  @Column('number', {
    nullable: true,
    name: 'ID_ORIGEM_REPROGRAMACAO'
  })
  public ID_ORIGEM_REPROGRAMACAO: number | null

  @Column('number', {
    nullable: true,
    name: 'ID_MOTIVO_REPROGRAMACAO'
  })
  public ID_MOTIVO_REPROGRAMACAO: number | null

  @Column('varchar2', {
    nullable: true,
    length: 240,
    name: 'DS_MOTIVO_REPROGRAMACAO'
  })
  public DS_MOTIVO_REPROGRAMACAO: string | null

  @Column('number', {
    nullable: true,
    precision: 2,
    scale: 0,
    name: 'CD_CLASSIF_REPROGR_PARADA'
  })
  public CD_CLASSIF_REPROGR_PARADA: number | null

  @Column('number', {
    nullable: true,
    precision: 10,
    scale: 0,
    name: 'CD_SUBCLAS_REPROGR_PARADA'
  })
  public CD_SUBCLAS_REPROGR_PARADA: number | null

  @Column('varchar2', {
    nullable: true,
    length: 240,
    name: 'DS_NOVA_DESCRICAO_PROGR_PARADA'
  })
  public DS_NOVA_DESCRICAO_PROGR_PARADA: string | null

  @Column('varchar2', {
    nullable: true,
    length: 2500,
    name: 'DS_OBSERVACAO_REPROGR_PARADA'
  })
  public DS_OBSERVACAO_REPROGR_PARADA: string | null

  @Column('varchar2', {
    nullable: true,
    length: 15,
    name: 'NM_AREA_ORIGEM_REPROGRAMACAO'
  })
  public NM_AREA_ORIGEM_REPROGRAMACAO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'CD_USUARIO_CONCLUSAO'
  })
  public CD_USUARIO_CONCLUSAO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 20,
    name: 'DT_CONCLUSAO'
  })
  public DT_CONCLUSAO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'CD_USUARIO_CANCELAMENTO'
  })
  public CD_USUARIO_CANCELAMENTO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 1,
    name: 'ID_STATUS_PROGRAMACAO'
  })
  public ID_STATUS_PROGRAMACAO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 1,
    name: 'ID_ATUAL'
  })
  public ID_ATUAL: string | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    precision: 1,
    scale: 0,
    name: 'FL_REINICIAR_FLUXO'
  })
  public FL_REINICIAR_FLUXO: number | null

  @Column('varchar2', {
    nullable: true,
    length: 400,
    name: 'DS_LOG_STATUS'
  })
  public DS_LOG_STATUS: string | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'USER_CREATE'
  })
  public USER_CREATE: string | null

  @Column('timestamp with local time zone', {
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

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DATE_UPDATE'
  })
  public DATE_UPDATE: Date | null

  @Column('number', {
    nullable: true,
    precision: 5,
    scale: 0,
    name: 'NR_REPROGRAMACOES_APROVADAS'
  })
  public NR_REPROGRAMACOES_APROVADAS: number | null

  @Column('number', {
    nullable: false,
    name: 'CD_UNIDADE_GERADORA'
  })
  public CD_UNIDADE_GERADORA: number

  @Column('varchar2', {
    nullable: true,
    length: 1,
    name: 'ID_CONJUNTO_USINA'
  })
  public ID_CONJUNTO_USINA: string | null

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.cdProgramacaoParada
  )
  public sauPgis: SAU_PGI[]
}
