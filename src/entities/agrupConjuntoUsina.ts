import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { ConjuntoUsina } from './conjuntoUsina'
import { Usina } from './usina'

@Entity('SAU_AGRUP_CONJUNTO_USINA')
export class AgrupConjuntoUsina {
  @ManyToOne(
    () => ConjuntoUsina,
    (SAU_CONJUNTO_USINA: ConjuntoUsina) => SAU_CONJUNTO_USINA.sauAgrupConjuntoUsinas,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_CONJUNTO' })
  public cdConjunto: ConjuntoUsina | null

  @ManyToOne(
    () => Usina,
    (SAU_USINA: Usina) => SAU_USINA.sauAgrupConjuntoUsinas,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_USINA' })
  public cdUsina: Usina | null

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
