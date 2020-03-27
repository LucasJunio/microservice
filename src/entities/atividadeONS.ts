import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { Usina } from './usina'
import { EquipamentoPgi } from './equipamentoPgi'

@Entity('SAU_ATIVIDADE_ONS')
export class AtividadeONS {
  @Column('number', {
    nullable: false,
    unique: true,
    name: 'CD_ATIVIDADE'
  })
  public CD_ATIVIDADE: number

  @ManyToOne(
    () => Usina,
    (SAU_USINA: Usina) => SAU_USINA.sauAtividadeOnss,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_USINA' })
  public cdUsina: Usina | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_ATIVIDADE'
  })
  public DS_ATIVIDADE: string | null

  @Column('varchar2', {
    nullable: true,
    length: 1,
    name: 'FL_ATIVO'
  })
  public FL_ATIVO: string | null

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
    nullable: false,
    primary: true,
    name: 'CD_ATIVIDADE_ONS'
  })
  public CD_ATIVIDADE_ONS: number

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null

  @OneToMany(
    () => EquipamentoPgi,
    (SAU_EQUIPAMENTO_PGI: EquipamentoPgi) => SAU_EQUIPAMENTO_PGI.cdAtividadeOns
  )
  public sauEquipamentoPgis: EquipamentoPgi[]
}
