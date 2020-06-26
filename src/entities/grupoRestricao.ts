import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm'
import { TemLookup } from './temLookup'

@Entity('SAU_GRUPO_RESTRICAO')
export class GrupoRestricao {
  @Column('number', {
    nullable: false,
    primary: true,
    name: 'CD_GRUPO_RESTRICAO'
  })
  public CD_GRUPO_RESTRICAO: number

  @Column('varchar2', {
    nullable: false,
    length: 5,
    name: 'DT_INICIO'
  })
  public DT_INICIO: string | null

  @Column('varchar2', {
    nullable: false,
    length: 5,
    name: 'DT_FIM'
  })
  public DT_FIM: string | null

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauIdGrupo,
    {}
  )
  @JoinColumn({ name: 'ID_GRUPO' })
  public idGrupo: TemLookup | null

  @ManyToOne(
    () => TemLookup,
    (SAU_ITEM_LOOKUP: TemLookup) => SAU_ITEM_LOOKUP.sauIdTipoRestricao,
    {}
  )
  @JoinColumn({ name: 'ID_TIPO_RESTRICAO' })
  public idTipoRestricao: TemLookup | null
}
