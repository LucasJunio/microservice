export class PpConsultaDto {
  public ID_UNIDADE_GERADORA: string | null

  public SG_USINA: string | null

  public NUM_PARADA: string | null

  public ANO_BASE: string | null

  public DT_HORA_INICIO_PROGRAMACAO: Date | null

  public DT_HORA_TERMINO_PROGRAMACAO: Date | null

  public DT_HORA_INICIO_PROGRAMACAO_REF: Date | null

  public DT_HORA_TERMINO_PROGRAMACAO_REF: Date | null

  public ID_STATUS: string | null

  public ID_TIPO: string | null

  public PAGE: number | null

  public ROWS_PER_PAGE: number | null

  public COLUMN: string[] | null

  public ORDER: string | null

  public DATAS_EXATAS: boolean | null
}
