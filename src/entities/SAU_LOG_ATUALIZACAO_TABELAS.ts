import { Column, Entity } from 'typeorm'

@Entity('SAU_LOG_ATUALIZACAO_TABELAS')
export class SAU_LOG_ATUALIZACAO_TABELAS {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_LOG'
  })
  public CD_LOG: number

  @Column('varchar2', {
    nullable: true,
    length: 50,
    name: 'DS_ROTINA'
  })
  public DS_ROTINA: string | null

  @Column('timestamp with local time zone', {
    nullable: true,
    name: 'DT_EXECUCAO'
  })
  public DT_EXECUCAO: Date | null

  @Column('varchar2', {
    nullable: true,
    length: 4000,
    name: 'DS_LOG'
  })
  public DS_LOG: string | null
}
