import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { SAU_PROGRAMACAO_PARADA } from './SAU_PROGRAMACAO_PARADA'
import { SAU_UNIDADE_GERADORA } from './SAU_UNIDADE_GERADORA'

@Entity('SAU_PROGRAMACAO_PARADA_UG')
export class SAU_PROGRAMACAO_PARADA_UG {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_PROGRAMACAO_PARADA_UG'
  })
  public CD_PROGRAMACAO_PARADA_UG: number

  @ManyToOne(
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.sauProgramacaoParadaUgs,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_PROGRAMACAO_PARADA' })
  public cdProgramacaoParada: SAU_PROGRAMACAO_PARADA | null

  @ManyToOne(
    () => SAU_UNIDADE_GERADORA,
    (SAU_UNIDADE_GERADORA: SAU_UNIDADE_GERADORA) => SAU_UNIDADE_GERADORA.sauProgramacaoParadaUgs,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_UNIDADE_GERADORA' })
  public cdUnidadeGeradora: SAU_UNIDADE_GERADORA | null

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
    default: () => '0',
    name: 'VERSION'
  })
  public VERSION: number | null
}
