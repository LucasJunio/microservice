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

@Entity('SAU_PARAM_PROGRAMACAO_PARADAS')
export class SAU_PARAM_PROGRAMACAO_PARADAS {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_PARAM_PROGRAMACAO_PARADAS'
  })
  public CD_PARAM_PROGRAMACAO_PARADAS: number

  @Column('date', {
    nullable: false,
    unique: true,
    name: 'DT_ANO'
  })
  public DT_ANO: Date

  @Column('number', {
    nullable: true,
    name: 'NR_ANOS_PARADA_LONGO_PRAZO'
  })
  public NR_ANOS_PARADA_LONGO_PRAZO: number | null

  @Column('date', {
    nullable: true,
    name: 'DT_FINAL_PARADAS_ANUAIS'
  })
  public DT_FINAL_PARADAS_ANUAIS: Date | null

  @Column('date', {
    nullable: true,
    name: 'DT_FINAL_PARADAS_PROGRAMADA'
  })
  public DT_FINAL_PARADAS_PROGRAMADA: Date | null

  @Column('number', {
    nullable: true,
    name: 'NR_PRAZO_AJUSTE_PARADA_ANUAL'
  })
  public NR_PRAZO_AJUSTE_PARADA_ANUAL: number | null

  @Column('number', {
    nullable: true,
    name: 'NR_PRAZO_PARADA_URGENTE'
  })
  public NR_PRAZO_PARADA_URGENTE: number | null

  @Column('number', {
    nullable: true,
    name: 'NR_PRAZO_REPROGRAMACAO'
  })
  public NR_PRAZO_REPROGRAMACAO: number | null

  @Column('number', {
    nullable: true,
    name: 'NR_PRAZO_EMISSAO_PGI'
  })
  public NR_PRAZO_EMISSAO_PGI: number | null

  @Column('number', {
    nullable: true,
    name: 'NR_HORAS_MINIMA_PARADA'
  })
  public NR_HORAS_MINIMA_PARADA: number | null

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
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null
}
