import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { SAU_CONJUNTO_USINA } from './SAU_CONJUNTO_USINA'
import { SAU_USINA } from './SAU_USINA'

@Entity('SAU_AGRUP_CONJUNTO_USINA')
export class SAU_AGRUP_CONJUNTO_USINA {
  @ManyToOne(
    () => SAU_CONJUNTO_USINA,
    (SAU_CONJUNTO_USINA: SAU_CONJUNTO_USINA) => SAU_CONJUNTO_USINA.sauAgrupConjuntoUsinas,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_CONJUNTO' })
  public cdConjunto: SAU_CONJUNTO_USINA | null

  @ManyToOne(
    () => SAU_USINA,
    (SAU_USINA: SAU_USINA) => SAU_USINA.sauAgrupConjuntoUsinas,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_USINA' })
  public cdUsina: SAU_USINA | null

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
    name: 'CD_AGRUP_CONJUNTO'
  })
  public CD_AGRUP_CONJUNTO: number

  @Column('number', {
    nullable: true,
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null
}
