import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { SAU_LOOKUP } from './SAU_LOOKUP'
import { SAU_EQUIPAMENTO_PGI } from './SAU_EQUIPAMENTO_PGI'
import { SAU_PGI } from './SAU_PGI'
import { SAU_PROGRAMACAO_PARADA } from './SAU_PROGRAMACAO_PARADA'

@Entity('SAU_ITEM_LOOKUP')
export class SAU_ITEM_LOOKUP {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_ITEM_LOOKUP'
  })
  public CD_ITEM_LOOKUP: number

  @ManyToOne(
    () => SAU_LOOKUP,
    (SAU_LOOKUP: SAU_LOOKUP) => SAU_LOOKUP.sauItemLookups,
    { nullable: false }
  )
  @JoinColumn({ name: 'CD_LOOKUP' })
  public cdLookup: SAU_LOOKUP | null

  @Column('varchar2', {
    nullable: false,
    unique: true,
    length: 30,
    name: 'ID_ITEM_LOOKUP'
  })
  public ID_ITEM_LOOKUP: string

  @Column('varchar2', {
    nullable: false,
    length: 400,
    name: 'DS_ITEM_LOOKUP'
  })
  public DS_ITEM_LOOKUP: string

  @Column('number', {
    nullable: true,
    default: () => '1',
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

  @OneToMany(
    () => SAU_EQUIPAMENTO_PGI,
    (SAU_EQUIPAMENTO_PGI: SAU_EQUIPAMENTO_PGI) => SAU_EQUIPAMENTO_PGI.cdLocal
  )
  public sauEquipamentoPgis: SAU_EQUIPAMENTO_PGI[]

  @OneToMany(
    () => SAU_EQUIPAMENTO_PGI,
    (SAU_EQUIPAMENTO_PGI: SAU_EQUIPAMENTO_PGI) => SAU_EQUIPAMENTO_PGI.idUnidadeMedida
  )
  public sauEquipamentoPgis2: SAU_EQUIPAMENTO_PGI[]

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.idCaracterizacao
  )
  public sauPgis: SAU_PGI[]

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.idClassifiIntervencao
  )
  public sauPgis2: SAU_PGI[]

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.idNatureza
  )
  public sauPgis3: SAU_PGI[]

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.idPeriodicidade
  )
  public sauPgis4: SAU_PGI[]

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.idStatus
  )
  public sauPgis5: SAU_PGI[]

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.idTempoRetorno
  )
  public sauPgis6: SAU_PGI[]

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.idTipoCadastro
  )
  public sauPgis7: SAU_PGI[]

  @OneToMany(
    () => SAU_PGI,
    (SAU_PGI: SAU_PGI) => SAU_PGI.idTipo
  )
  public sauPgis8: SAU_PGI[]

  @OneToMany(
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.idStatus
  )
  public sauProgramacaoParadas: SAU_PROGRAMACAO_PARADA[]

  @OneToMany(
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.idTipoParada
  )
  public sauProgramacaoParadas2: SAU_PROGRAMACAO_PARADA[]

  @OneToMany(
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.idTipoProgramacao
  )
  public sauProgramacaoParadas3: SAU_PROGRAMACAO_PARADA[]

  @OneToMany(
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.idMotivoReprogramacao
  )
  public sauProgramacaoParadas4: SAU_PROGRAMACAO_PARADA[]

  @OneToMany(
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.idOrigemReprogramacao
  )
  public sauProgramacaoParadas5: SAU_PROGRAMACAO_PARADA[]

  @OneToMany(
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.idStatusCancelamento
  )
  public sauProgramacaoParadas6: SAU_PROGRAMACAO_PARADA[]

  @OneToMany(
    () => SAU_PROGRAMACAO_PARADA,
    (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA) => SAU_PROGRAMACAO_PARADA.idStatusReprogramacao
  )
  public sauProgramacaoParadas7: SAU_PROGRAMACAO_PARADA[]
}
