import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {SAU_ITEM_LOOKUP} from "./SAU_ITEM_LOOKUP";


@Entity("SAU_PRORROGACAO_DOCS")
export class SAU_PRORROGACAO_DOCS {

    @Column("number",{ 
        nullable:false,
        primary:true,
        name:"CD_PRORROGACAO_DOCS"
        })
    CD_PRORROGACAO_DOCS:number;
        

    @Column("number",{ 
        nullable:false,
        name:"CD_DOCUMENTO"
        })
    CD_DOCUMENTO:number;
        

   
    @ManyToOne(()=>SAU_ITEM_LOOKUP, (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP)=>SAU_ITEM_LOOKUP.sauProrrogacaoDocss,{  nullable:false, })
    @JoinColumn({ name:'ID_TIPO_DOCUMENTO'})
    idTipoDocumento:SAU_ITEM_LOOKUP | null;


    @Column("timestamp with local time zone",{ 
        nullable:false,
        name:"DT_PRORROGACAO"
        })
    DT_PRORROGACAO:Date;
        

    @Column("varchar2",{ 
        nullable:true,
        length:100,
        name:"NM_DESPACHANTE_ONS_AGENTE"
        })
    NM_DESPACHANTE_ONS_AGENTE:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:100,
        name:"NM_OPERADOR_COS"
        })
    NM_OPERADOR_COS:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:100,
        name:"NM_OPERADOR_USINA"
        })
    NM_OPERADOR_USINA:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:4000,
        name:"DS_MOTIVO_PRORROGACAO"
        })
    DS_MOTIVO_PRORROGACAO:string | null;
        

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