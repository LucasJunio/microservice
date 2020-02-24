import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {SAU_EMAIL_AGENTE_ONS} from "./SAU_EMAIL_AGENTE_ONS";
import {SAU_EQUIPAMENTO_PGI} from "./SAU_EQUIPAMENTO_PGI";
import {SAU_PGI} from "./SAU_PGI";
import {SAU_PGI_AI} from "./SAU_PGI_AI";


@Entity("SAU_AGENTE_ONS")
export class SAU_AGENTE_ONS {

    @Column("varchar2",{ 
        nullable:true,
        length:50,
        name:"NM_CURTO"
        })
    NM_CURTO:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:200,
        name:"NM_LONGO"
        })
    NM_LONGO:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:30,
        name:"LOGIN"
        })
    LOGIN:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:200,
        name:"SENHA"
        })
    SENHA:string | null;
        

    @Column("number",{ 
        nullable:true,
        precision:1,
        scale:0,
        name:"FL_ATIVO"
        })
    FL_ATIVO:number | null;
        

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
        nullable:false,
        primary:true,
        name:"CD_AGENTE_ONS"
        })
    CD_AGENTE_ONS:number;
        

    @Column("varchar2",{ 
        nullable:false,
        unique: true,
        length:20,
        name:"SG_AGENTE"
        })
    SG_AGENTE:string;
        

    @Column("number",{ 
        nullable:true,
        default: () => "0",
        name:"VERSION"
        })
    VERSION:number | null;
        

   
    @OneToMany(()=>SAU_EMAIL_AGENTE_ONS, (SAU_EMAIL_AGENTE_ONS: SAU_EMAIL_AGENTE_ONS)=>SAU_EMAIL_AGENTE_ONS.cdAgenteOns)
    sauEmailAgenteOnss:SAU_EMAIL_AGENTE_ONS[];
    

   
    @OneToMany(()=>SAU_EQUIPAMENTO_PGI, (SAU_EQUIPAMENTO_PGI: SAU_EQUIPAMENTO_PGI)=>SAU_EQUIPAMENTO_PGI.cdAgenteOns)
    sauEquipamentoPgis:SAU_EQUIPAMENTO_PGI[];
    

   
    @OneToMany(()=>SAU_PGI, (SAU_PGI: SAU_PGI)=>SAU_PGI.cdAgenteResp)
    sauPgis:SAU_PGI[];
    

   
    @OneToMany(()=>SAU_PGI, (SAU_PGI: SAU_PGI)=>SAU_PGI.cdAgenteSolic)
    sauPgis2:SAU_PGI[];
    

   
    @OneToMany(()=>SAU_PGI_AI, (SAU_PGI_AI: SAU_PGI_AI)=>SAU_PGI_AI.cdAgenteOns)
    sauPgiAis:SAU_PGI_AI[];
    
}