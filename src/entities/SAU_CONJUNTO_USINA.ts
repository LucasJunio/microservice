import { Column, Entity, OneToMany } from 'typeorm'
import { SAU_AGRUP_CONJUNTO_USINA } from './SAU_AGRUP_CONJUNTO_USINA'

@Entity('SAU_CONJUNTO_USINA')
export class SAU_CONJUNTO_USINA {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_CONJUNTO'
  })
  public CD_CONJUNTO: number

  @Column('varchar2', {
    nullable: false,
    length: 200,
    name: 'NM_CONJUNTO'
  })
  public NM_CONJUNTO: string

  @Column('number', {
    nullable: true,
    precision: 1,
    scale: 0,
    name: 'FL_ATIVO'
  })
  public FL_ATIVO: number | null

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

  @Column('varchar2', {
    nullable: false,
    unique: true,
    length: 50,
    name: 'SG_CONJUNTO'
  })
  public SG_CONJUNTO: string

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null

  @OneToMany(
    () => SAU_AGRUP_CONJUNTO_USINA,
    (SAU_AGRUP_CONJUNTO_USINA: SAU_AGRUP_CONJUNTO_USINA) => SAU_AGRUP_CONJUNTO_USINA.cdConjunto
  )
  public sauAgrupConjuntoUsinas: SAU_AGRUP_CONJUNTO_USINA[]
}
