import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { SAU_PROGRAMACAO_PARADA } from './SAU_PROGRAMACAO_PARADA'

@Entity('SAU_HIST_PROGRAMACAO_PARADA')
export class SAU_HIST_PROGRAMACAO_PARADA {
  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_ACAO'
  })
  public DS_ACAO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_OBSERVACAO'
  })
  public DS_OBSERVACAO: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DATE_CREATE'
  })
  public DATE_CREATE: Date | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_HISTORICO'
  })
  public DT_HISTORICO: Date | null

  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_HISTORICO'
  })
  public CD_HISTORICO: number

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'CD_USUARIO'
  })
  public CD_USUARIO: string | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'USER_CREATE'
  })
  public USER_CREATE: string | null

  @Column('varchar2', {
    nullable: true,
    length: 30,
    name: 'FLOW'
  })
  public FLOW: string | null

  @ManyToOne(
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.sauHistProgramacaoParadas,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_PROGRAMACAO_PARADA' })
  public cdProgramacaoParada: SAU_PROGRAMACAO_PARADA | null
}
