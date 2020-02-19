import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {SAU_AGRUP_CONJUNTO_USINA} from "./SAU_AGRUP_CONJUNTO_USINA";
import {SAU_ATIVIDADE_ONS} from "./SAU_ATIVIDADE_ONS";
import {SAU_UNIDADE_GERADORA} from "./SAU_UNIDADE_GERADORA";


@Entity("SAU_USINA")
@Index("SAU_USINA_IX1",["CD_EMPRESA_VINCULADA",])
export class SAU_USINA {

    @Column('timestamp with local time zone',{ 
        nullable:true,
        name:"DT_CERTIFICACAO"
        })
    DT_CERTIFICACAO:Date | null;
        

    @Column("number",{ 
        nullable:true,
        precision:10,
        scale:0,
        name:"CD_EMPRESA_VINCULADA"
        })
    CD_EMPRESA_VINCULADA:number | null;
        

    @Column("number",{ 
        nullable:true,
        precision:10,
        scale:0,
        name:"CD_AGENTE_MAE"
        })
    CD_AGENTE_MAE:number | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:15,
        name:"CD_MAE"
        })
    CD_MAE:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:15,
        name:"ID_SUBMERCADO"
        })
    ID_SUBMERCADO:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:1,
        name:"ID_PARTIC_PERDAS"
        })
    ID_PARTIC_PERDAS:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:1,
        name:"ID_PARTIC_MRE"
        })
    ID_PARTIC_MRE:string | null;
        

    @Column("number",{ 
        nullable:true,
        precision:1,
        scale:0,
        name:"FL_TRANSFERENCIA"
        })
    FL_TRANSFERENCIA:number | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:20,
        name:"SG_ONS"
        })
    SG_ONS:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:1,
        name:"ID_USINA_EXPORT"
        })
    ID_USINA_EXPORT:string | null;
        

    @Column("number",{ 
        nullable:true,
        name:"CD_SINERCOM"
        })
    CD_SINERCOM:number | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:20,
        name:"CD_CLASSE_SINERCOM"
        })
    CD_CLASSE_SINERCOM:string | null;
        

    @Column("number",{ 
        nullable:true,
        default: () => "0",
        precision:1,
        scale:0,
        name:"FL_PROGRAMA_GERACAO"
        })
    FL_PROGRAMA_GERACAO:number | null;
        

    @Column("number",{ 
        nullable:true,
        precision:10,
        scale:2,
        name:"VL_COEFICIENTE_A"
        })
    VL_COEFICIENTE_A:number | null;
        

    @Column("number",{ 
        nullable:true,
        precision:10,
        scale:2,
        name:"VL_COEFICIENTE_B"
        })
    VL_COEFICIENTE_B:number | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:30,
        name:"SG_POS_OPERACAO"
        })
    SG_POS_OPERACAO:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:5,
        name:"DS_COMBUSTIVEL_GCE"
        })
    DS_COMBUSTIVEL_GCE:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:30,
        name:"USER_CREATE"
        })
    USER_CREATE:string | null;
        

    @Column('timestamp with local time zone',{ 
        nullable:true,
        name:"DATE_CREATE"
        })
    DATE_CREATE:Date | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:30,
        name:"USER_UPDATE"
        })
    USER_UPDATE:string | null;
        

    @Column('timestamp with local time zone',{ 
        nullable:true,
        name:"DATE_UPDATE"
        })
    DATE_UPDATE:Date | null;
        

    @Column("number",{ 
        nullable:false,
        primary:true,
        name:"CD_USINA"
        })
    CD_USINA:number;
        

    @Column("number",{ 
        nullable:true,
        default: () => "0",
        name:"VERSION"
        })
    VERSION:number | null;
        

    @Column("varchar2",{ 
        nullable:false,
        unique: true,
        length:14,
        name:"SG_USINA"
        })
    SG_USINA:string;
        

    @Column("varchar2",{ 
        nullable:false,
        length:50,
        name:"NM_USINA"
        })
    NM_USINA:string;
        

    @Column("number",{ 
        nullable:false,
        precision:1,
        scale:0,
        name:"FL_ATIVO"
        })
    FL_ATIVO:number;
        

    @Column("varchar2",{ 
        nullable:false,
        length:6,
        name:"ID_TIPO_USINA"
        })
    ID_TIPO_USINA:string;
        

    @Column("varchar2",{ 
        nullable:true,
        length:15,
        name:"ID_REGIONAL"
        })
    ID_REGIONAL:string | null;
        

    @Column("number",{ 
        nullable:true,
        precision:1,
        scale:0,
        name:"FL_ALTERNATIVA"
        })
    FL_ALTERNATIVA:number | null;
        

    @Column("number",{ 
        nullable:true,
        precision:1,
        scale:0,
        name:"FL_CALCULA_DISPO_ISO"
        })
    FL_CALCULA_DISPO_ISO:number | null;
        

    @Column("number",{ 
        nullable:true,
        precision:1,
        scale:0,
        name:"FL_GERACAO_TM"
        })
    FL_GERACAO_TM:number | null;
        

    @Column("number",{ 
        nullable:true,
        precision:1,
        scale:0,
        name:"FL_CONSUMO_TM"
        })
    FL_CONSUMO_TM:number | null;
        

    @Column("number",{ 
        nullable:true,
        precision:6,
        scale:0,
        name:"CD_USINA_HDOM"
        })
    CD_USINA_HDOM:number | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:30,
        name:"CD_USINA_SAMUG"
        })
    CD_USINA_SAMUG:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:50,
        name:"CD_USINA_HDOM_CSV"
        })
    CD_USINA_HDOM_CSV:string | null;
        

    @Column("number",{ 
        nullable:true,
        precision:1,
        scale:0,
        name:"FL_NOTIFICACAO_RO"
        })
    FL_NOTIFICACAO_RO:number | null;
        

    @Column('timestamp with local time zone',{ 
        nullable:true,
        name:"DT_INICIO_NOTIFICACAO"
        })
    DT_INICIO_NOTIFICACAO:Date | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:100,
        name:"NM_LONGO"
        })
    NM_LONGO:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:50,
        name:"NM_USINA_SUEZ"
        })
    NM_USINA_SUEZ:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:50,
        name:"NM_APRESENTACAO"
        })
    NM_APRESENTACAO:string | null;
        

    @Column("number",{ 
        nullable:true,
        precision:10,
        scale:3,
        name:"VL_CAPACID_NOMINAL"
        })
    VL_CAPACID_NOMINAL:number | null;
        

    @Column("number",{ 
        nullable:true,
        precision:10,
        scale:3,
        name:"VL_CAPACID_NOMINAL_ENGIE"
        })
    VL_CAPACID_NOMINAL_ENGIE:number | null;
        

    @Column("number",{ 
        nullable:true,
        precision:10,
        scale:3,
        name:"VL_GARANTIA_FISICA"
        })
    VL_GARANTIA_FISICA:number | null;
        

    @Column("number",{ 
        nullable:true,
        precision:4,
        scale:0,
        name:"CD_RIO"
        })
    CD_RIO:number | null;
        

    @Column("number",{ 
        nullable:true,
        precision:8,
        scale:0,
        name:"NR_CEP"
        })
    NR_CEP:number | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:100,
        name:"DS_ENDERECO"
        })
    DS_ENDERECO:string | null;
        

    @Column("number",{ 
        nullable:true,
        precision:8,
        scale:0,
        name:"CD_CIDADE"
        })
    CD_CIDADE:number | null;
        

    @Column("varchar2",{ 
        nullable:false,
        length:2,
        name:"SG_UF"
        })
    SG_UF:string;
        

    @Column("varchar2",{ 
        nullable:true,
        length:15,
        name:"DS_LATITUDE"
        })
    DS_LATITUDE:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:15,
        name:"DS_LONGITUDE"
        })
    DS_LONGITUDE:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:100,
        name:"ID_STATUS_USINA"
        })
    ID_STATUS_USINA:string | null;
        

    @Column('timestamp with local time zone',{ 
        nullable:true,
        name:"DT_DESATIVACAO"
        })
    DT_DESATIVACAO:Date | null;
        

    @Column('timestamp with local time zone',{ 
        nullable:true,
        name:"DT_AQUISICAO"
        })
    DT_AQUISICAO:Date | null;
        

    @Column('timestamp with local time zone',{ 
        nullable:true,
        name:"DT_OPERACAO_COMERCIAL"
        })
    DT_OPERACAO_COMERCIAL:Date | null;
        

   
    @OneToMany(()=>SAU_AGRUP_CONJUNTO_USINA, (SAU_AGRUP_CONJUNTO_USINA: SAU_AGRUP_CONJUNTO_USINA)=>SAU_AGRUP_CONJUNTO_USINA.cdUsina)
    sauAgrupConjuntoUsinas:SAU_AGRUP_CONJUNTO_USINA[];
    

   
    @OneToMany(()=>SAU_ATIVIDADE_ONS, (SAU_ATIVIDADE_ONS: SAU_ATIVIDADE_ONS)=>SAU_ATIVIDADE_ONS.cdUsina)
    sauAtividadeOnss:SAU_ATIVIDADE_ONS[];
    

   
    @OneToMany(()=>SAU_UNIDADE_GERADORA, (SAU_UNIDADE_GERADORA: SAU_UNIDADE_GERADORA)=>SAU_UNIDADE_GERADORA.cdUsina)
    sauUnidadeGeradoras:SAU_UNIDADE_GERADORA[];
    
}