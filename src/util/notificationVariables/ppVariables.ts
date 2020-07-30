interface IPpVariables {
  NUM_AREA_ORIGEM_CANCEL: string
  MOTIVO_CANCELAMENTO: string
  NUM_PARADA: number | string
  USINA: string
  DES_PARADA: string
  UG: string
  DT_INICIO_SERVICO: string
  DT_FIM_SERVICO: string
  DS_SERVICO: string
  DT_INICIO_PROG: string
  DT_FIM_PROG: string
  TIPO: string
  TIPO_PROG: string
  CLASSIFICACAO: string
  NUM_PGI: string
  MOTIVO_REPROG: string
  ORIGEM_REPROG: string
  DES_MOTIVO: string
  DT_INICIO_REPROG: string
  DT_FIM_REPROG: string
  DATA: string
  USUARIO: string
  DT_CANCELAMENTO: string
  NM_AREA_ORIGEM: string
  NM_AREA_ORIGEM_CANCEL: string
  NM_AREA_ORIGEM_REPROG: string
}

class PpVariables implements IPpVariables {
  public NM_AREA_ORIGEM: string
  public NM_AREA_ORIGEM_CANCEL: string
  public NM_AREA_ORIGEM_REPROG: string
  public DT_CANCELAMENTO: string
  public USUARIO: string
  public NUM_AREA_ORIGEM_CANCEL: string
  public MOTIVO_CANCELAMENTO: string
  public NUM_PARADA: number | string
  public USINA: string
  public DES_PARADA: string
  public UG: string
  public DT_INICIO_SERVICO: string
  public DT_FIM_SERVICO: string
  public DS_SERVICO: string
  public DT_INICIO_PROG: string
  public DT_FIM_PROG: string
  public TIPO: string
  public TIPO_PROG: string
  public CLASSIFICACAO: string
  public NUM_PGI: string
  public MOTIVO_REPROG: string
  public ORIGEM_REPROG: string
  public DES_MOTIVO: string
  public DT_INICIO_REPROG: string
  public DT_FIM_REPROG: string
  public DATA: string
}

export default PpVariables
