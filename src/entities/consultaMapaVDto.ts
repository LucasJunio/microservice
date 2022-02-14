import { ConsultaMapaPPV } from './consultaMapaPPV'
import { TemLookup } from './temLookup'
import { ConsultaMapaPgiV } from './consultaMapaPgiV'

class ConsultaMapaVDto {
  public mapaType: any

  public dtHistorica: Date
  public tipoParadas: TemLookup[]
  public status: TemLookup[]
  public paradas: ConsultaMapaPPV[]

  public diType: any
  public statusDi: TemLookup
  public dis: ConsultaMapaPgiV[]

  public isDiSemParada: boolean

  public dtInicio: Date
  public dtFim: Date
  public usinas: any[]
  public tipoUsinas: TemLookup[]

  public usinasToShow: any[]
}

export default ConsultaMapaVDto
