import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {SAU_ITEM_LOOKUP} from "./SAU_ITEM_LOOKUP";


@Entity("SAU_DETALHAMENTO_EXECUCAO_DOCS")
export class SAU_DETALHAMENTO_EXECUCAO_DOCS {

    @Column("number",{ 
        nullable:false,
        primary:true,
        name:"CD_DETALHAMENTO_EXECUCAO_DOCS"
        })
    CD_DETALHAMENTO_EXECUCAO_DOCS:number;
        

    @Column("number",{ 
        nullable:false,
        unique: true,
        name:"CD_DOCUMENTO"
        })
    CD_DOCUMENTO:number;
        

   
    @ManyToOne(()=>SAU_ITEM_LOOKUP, (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP)=>SAU_ITEM_LOOKUP.sauDetalhamentoExecucaoDocss,{  nullable:false, })
    @JoinColumn({ name:'ID_TIPO_DOCUMENTO'})
    idTipoDocumento:SAU_ITEM_LOOKUP | null;


    @Column("number",{ 
        nullable:false,
        unique: true,
        name:"NR_SEQ_DETALHAMENTO"
        })
    NR_SEQ_DETALHAMENTO:number;
        

    @Column("timestamp with local time zone",{ 
        nullable:true,
        name:"DT_DETALHAMENTO"
        })
    DT_DETALHAMENTO:Date | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:4000,
        name:"DS_DETALHAMENTO"
        })
    DS_DETALHAMENTO:string | null;
        

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