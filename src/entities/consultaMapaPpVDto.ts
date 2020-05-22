import { ConsultaMapaPPV } from './consultaMapaPPV'
import { TemLookup } from './temLookup'
import { Usina } from './usina'

class ConsultaMapaPpVDto {
  public dtInicio: Date
  public dtFim: Date
  public status: TemLookup[]
  public tipoParadas: TemLookup[]
  public tipoUsinas: TemLookup[]
  public usinas: any[]

  public paradas: ConsultaMapaPPV[]
}

export default ConsultaMapaPpVDto
