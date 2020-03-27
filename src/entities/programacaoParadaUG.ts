import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { ProgramacaoParada } from './programacaoParada'
import { UnidadeGeradora } from './unidadeGeradora'

@Entity('SAU_PROGRAMACAO_PARADA_UG')
export class ProgramacaoParadaUG {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_PROGRAMACAO_PARADA_UG'
  })
  public CD_PROGRAMACAO_PARADA_UG: number

  @ManyToOne(
    () => ProgramacaoParada,
    (SAU_PROGRAMACAO_PARADA: ProgramacaoParada) => SAU_PROGRAMACAO_PARADA.sauProgramacaoParadaUgs,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_PROGRAMACAO_PARADA' })
  public cdProgramacaoParada: ProgramacaoParada | null

  @ManyToOne(
    () => UnidadeGeradora,
    (SAU_UNIDADE_GERADORA: UnidadeGeradora) => SAU_UNIDADE_GERADORA.sauProgramacaoParadaUgs,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_UNIDADE_GERADORA' })
  public cdUnidadeGeradora: UnidadeGeradora | null

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
