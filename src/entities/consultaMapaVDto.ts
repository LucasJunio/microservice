import { ConsultaMapaPPV } from './consultaMapaPPV'
import { TemLookup } from './temLookup'
import { Usina } from './usina'
import { ConsultaMapaPgiV } from './consultaMapaPgiV'

class ConsultaMapaVDto {
  public mapaType: any

  public dtHistorica: Date
  public tipoParadas: TemLookup[]
  public status: TemLookup[]

  public diType: any
  public statusDi: any

  public dtInicio: Date
  public dtFim: Date
  public usinas: any[]
  public tipoUsinas: TemLookup[]

  public paradas: ConsultaMapaPPV[]
  public dis: ConsultaMapaPgiV[]
}

export default ConsultaMapaVDto
