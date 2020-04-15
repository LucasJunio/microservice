import { Column, Entity, OneToMany } from 'typeorm'
import { PgiAi } from './pgiAi'

@Entity('SAU_PGI_LOCAIS')
export class PgiLocais {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_LOCAL'
  })
  public CD_LOCAL: number

  @Column('number', {
    nullable: false,
    unique: true,
    name: 'CD_CONJUNTO_USINA'
  })
  public CD_CONJUNTO_USINA: number

  @Column('varchar2', {
    nullable: false,
    unique: true,
    length: 10,
    name: 'SG_LOCAL'
  })
  public SG_LOCAL: string

  @Column('varchar2', {
    nullable: false,
    length: 400,
    name: 'NM_LOCAL'
  })
  public NM_LOCAL: string

  @Column('number', {
    nullable: false,
    name: 'FL_ATIVO'
  })
  public FL_ATIVO: number

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

  @Column('varchar2', {
    nullable: true,
    unique: true,
    length: 1,
    name: 'ID_CONJUNTO_USINA'
  })
  public ID_CONJUNTO_USINA: string | null

  @OneToMany(
    () => PgiAi,
    (SAU_PGI_AI: PgiAi) => SAU_PGI_AI.cdLocal
  )
  public sauPgiAis: PgiAi[]
}
