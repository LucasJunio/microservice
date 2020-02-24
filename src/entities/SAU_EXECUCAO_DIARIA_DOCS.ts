import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {SAU_ITEM_LOOKUP} from "./SAU_ITEM_LOOKUP";


@Entity("SAU_EXECUCAO_DIARIA_DOCS")
export class SAU_EXECUCAO_DIARIA_DOCS {

    @Column("number",{ 
        nullable:false,
        primary:true,
        name:"CD_EXECUCAO_DIARIA_DOCS"
        })
    CD_EXECUCAO_DIARIA_DOCS:number;
        

    @Column("number",{ 
        nullable:false,
        unique: true,
        name:"CD_DOCUMENTO"
        })
    CD_DOCUMENTO:number;
        

   
    @ManyToOne(()=>SAU_ITEM_LOOKUP, (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP)=>SAU_ITEM_LOOKUP.sauExecucaoDiariaDocss,{  nullable:false, })
    @JoinColumn({ name:'ID_TIPO_DOCUMENTO'})
    idTipoDocumento:SAU_ITEM_LOOKUP | null;


    @Column("number",{ 
        nullable:false,
        unique: true,
        name:"NR_SEQ_EXECUCAO"
        })
    NR_SEQ_EXECUCAO:number;
        

    @Column("timestamp with local time zone",{ 
        nullable:true,
        name:"DT_INICIO"
        })
    DT_INICIO:Date | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:100,
        name:"NM_DESPACHANTE_ONS_AGENTE_INI"
        })
    NM_DESPACHANTE_ONS_AGENTE_INI:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:100,
        name:"NM_OPERADOR_COS_INI"
        })
    NM_OPERADOR_COS_INI:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:100,
        name:"NM_OPERADOR_USINA_INI"
        })
    NM_OPERADOR_USINA_INI:string | null;
        

    @Column("timestamp with local time zone",{ 
        nullable:true,
        name:"DATA_FIM"
        })
    DATA_FIM:Date | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:100,
        name:"NM_DESPACHANTE_ONS_AGENTE_FIM"
        })
    NM_DESPACHANTE_ONS_AGENTE_FIM:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:100,
        name:"NM_OPERADOR_COS_FIM"
        })
    NM_OPERADOR_COS_FIM:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:100,
        name:"NM_OPERADOR_USINA_FIM"
        })
    NM_OPERADOR_USINA_FIM:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:30,
        name:"USER_CREATE"
        })
    USER_CREATE:string | null;
        

    @Column("timestamp with local time zone",{ 
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
        

    @Column("timestamp with local time zone",{ 
        nullable:true,
        name:"DATE_UPDATE"
        })
    DATE_UPDATE:Date | null;
        

    @Column("number",{ 
        nullable:true,
        default: () => "0",
        name:"VERSION"
        })
    VERSION:number | null;
        
}