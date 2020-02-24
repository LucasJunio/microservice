import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {SAU_PGI} from "./SAU_PGI";
import {SAU_PGI_AI} from "./SAU_PGI_AI";


@Entity("SAU_INTERVENCAO_PGI")
export class SAU_INTERVENCAO_PGI {

    @Column("number",{ 
        nullable:false,
        primary:true,
        name:"CD_INTERVENCAO_PGI"
        })
    CD_INTERVENCAO_PGI:number;
        

   
    @ManyToOne(()=>SAU_PGI, (SAU_PGI: SAU_PGI)=>SAU_PGI.sauIntervencaoPgis,{  nullable:false, })
    @JoinColumn({ name:'CD_PGI'})
    cdPgi:SAU_PGI | null;


    @Column("number",{ 
        nullable:true,
        name:"NR_ETAPA"
        })
    NR_ETAPA:number | null;
        

    @Column("timestamp with local time zone",{ 
        nullable:true,
        name:"DT_INICIO"
        })
    DT_INICIO:Date | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:4000,
        name:"DS_INTERVENCAO"
        })
    DS_INTERVENCAO:string | null;
        

    @Column("timestamp with local time zone",{ 
        nullable:true,
        name:"DT_FIM"
        })
    DT_FIM:Date | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:100,
        name:"NM_USUARIO_RESP"
        })
    NM_USUARIO_RESP:string | null;
        

    @Column("number",{ 
        nullable:true,
        precision:1,
        scale:0,
        name:"FL_IMPEDIMENTO"
        })
    FL_IMPEDIMENTO:number | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:20,
        name:"NUM_SGI"
        })
    NUM_SGI:string | null;
        

    @Column("timestamp with local time zone",{ 
        nullable:true,
        name:"DATE_CREATE"
        })
    DATE_CREATE:Date | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:30,
        name:"USER_CREATE"
        })
    USER_CREATE:string | null;
        

    @Column("timestamp with local time zone",{ 
        nullable:true,
        name:"DATE_UPDATE"
        })
    DATE_UPDATE:Date | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:30,
        name:"USER_UPDATE"
        })
    USER_UPDATE:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:20,
        name:"NUM_OS_INTERVENCAO"
        })
    NUM_OS_INTERVENCAO:string | null;
        

    @Column("number",{ 
        nullable:true,
        default: () => "0",
        name:"VERSION"
        })
    VERSION:number | null;
        

   
    @OneToMany(()=>SAU_PGI_AI, (SAU_PGI_AI: SAU_PGI_AI)=>SAU_PGI_AI.cdIntervencaoPgi)
    sauPgiAis:SAU_PGI_AI[];
    
}