import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {SAU_USINA} from "./SAU_USINA";
import {SAU_PGI} from "./SAU_PGI";
import {SAU_PROGRAMACAO_PARADA_UG} from "./SAU_PROGRAMACAO_PARADA_UG";


@Entity("SAU_UNIDADE_GERADORA")
@Index("SAU_UNIDADE_GERADORA_IX1",["CD_CLASSE_UNIDADE",])
export class SAU_UNIDADE_GERADORA {

   
    @ManyToOne(()=>SAU_USINA, (SAU_USINA: SAU_USINA)=>SAU_USINA.sauUnidadeGeradoras,{  nullable:false, })
    @JoinColumn({ name:'CD_USINA'})
    cdUsina:SAU_USINA | null;


    @Column("number",{ 
        nullable:false,
        primary:true,
        name:"CD_UNIDADE_GERADORA"
        })
    CD_UNIDADE_GERADORA:number;
        

    @Column("varchar2",{ 
        nullable:false,
        length:40,
        name:"NM_UNIDADE_GERADORA"
        })
    NM_UNIDADE_GERADORA:string;
        

    @Column("number",{ 
        nullable:false,
        precision:1,
        scale:0,
        name:"FL_ATIVO"
        })
    FL_ATIVO:number;
        

    @Column("number",{ 
        nullable:false,
        precision:2,
        scale:0,
        name:"CD_CLASSE_UNIDADE"
        })
    CD_CLASSE_UNIDADE:number;
        

    @Column("number",{ 
        nullable:false,
        precision:6,
        scale:3,
        name:"VL_POTENCIA_NOMINAL_GERADOR"
        })
    VL_POTENCIA_NOMINAL_GERADOR:number;
        

    @Column("number",{ 
        nullable:true,
        precision:6,
        scale:0,
        name:"CD_UG_HDOM"
        })
    CD_UG_HDOM:number | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:50,
        name:"CD_UG_HDOM_CSV"
        })
    CD_UG_HDOM_CSV:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:20,
        name:"CD_UG_SAMUG"
        })
    CD_UG_SAMUG:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:20,
        name:"CD_IMP_GER_BRUTA"
        })
    CD_IMP_GER_BRUTA:string | null;
        

    @Column("number",{ 
        nullable:true,
        precision:6,
        scale:3,
        name:"VL_POTENCIA_MINIMA"
        })
    VL_POTENCIA_MINIMA:number | null;
        

    @Column("number",{ 
        nullable:true,
        precision:6,
        scale:3,
        name:"VL_POTENCIA_MAXIMA"
        })
    VL_POTENCIA_MAXIMA:number | null;
        

    @Column("number",{ 
        nullable:true,
        precision:6,
        scale:3,
        name:"VL_POTENCIA_MINIMA_E"
        })
    VL_POTENCIA_MINIMA_E:number | null;
        

    @Column("number",{ 
        nullable:true,
        precision:6,
        scale:3,
        name:"VL_POTENCIA_MAXIMA_E"
        })
    VL_POTENCIA_MAXIMA_E:number | null;
        

    @Column('timestamp with local time zone',{ 
        nullable:true,
        name:"DT_INICIO_DADOS_SAU"
        })
    DT_INICIO_DADOS_SAU:Date | null;
        

    @Column('timestamp with local time zone',{ 
        nullable:true,
        name:"DT_INICIO_OPERACAO"
        })
    DT_INICIO_OPERACAO:Date | null;
        

    @Column('timestamp with local time zone',{ 
        nullable:true,
        name:"DT_INICIO_HDOM"
        })
    DT_INICIO_HDOM:Date | null;
        

    @Column('timestamp with local time zone',{ 
        nullable:false,
        name:"DT_PRIMEIRO_SINCRONISMO"
        })
    DT_PRIMEIRO_SINCRONISMO:Date;
        

    @Column('timestamp with local time zone',{ 
        nullable:true,
        name:"DT_PRIMEIRO_GIRO"
        })
    DT_PRIMEIRO_GIRO:Date | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:50,
        name:"NM_UG_SUEZ"
        })
    NM_UG_SUEZ:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:15,
        name:"CD_MAE"
        })
    CD_MAE:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:120,
        name:"NM_LOCALIZACAO_MANUTENCAO"
        })
    NM_LOCALIZACAO_MANUTENCAO:string | null;
        

    @Column("number",{ 
        nullable:true,
        precision:5,
        scale:2,
        name:"VL_GERACAO_MINIMA"
        })
    VL_GERACAO_MINIMA:number | null;
        

    @Column("number",{ 
        nullable:true,
        precision:5,
        scale:2,
        name:"VL_GERACAO_MAXIMA"
        })
    VL_GERACAO_MAXIMA:number | null;
        

    @Column("number",{ 
        nullable:true,
        precision:10,
        scale:2,
        name:"VL_GERACAO_MIN_PROG"
        })
    VL_GERACAO_MIN_PROG:number | null;
        

    @Column("number",{ 
        nullable:true,
        precision:10,
        scale:2,
        name:"VL_GERACAO_MAX_PROG"
        })
    VL_GERACAO_MAX_PROG:number | null;
        

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
        

    @Column("varchar2",{ 
        nullable:false,
        unique: true,
        length:14,
        name:"SG_UNIDADE_GERADORA"
        })
    SG_UNIDADE_GERADORA:string;
        

    @Column("number",{ 
        nullable:true,
        default: () => "0",
        name:"VERSION"
        })
    VERSION:number | null;
        

   
    @OneToMany(()=>SAU_PGI, (SAU_PGI: SAU_PGI)=>SAU_PGI.cdUnidadeGeradora)
    sauPgis:SAU_PGI[];
    

   
    @OneToMany(()=>SAU_PROGRAMACAO_PARADA_UG, (SAU_PROGRAMACAO_PARADA_UG: SAU_PROGRAMACAO_PARADA_UG)=>SAU_PROGRAMACAO_PARADA_UG.cdUnidadeGeradora)
    sauProgramacaoParadaUgs:SAU_PROGRAMACAO_PARADA_UG[];
    
}