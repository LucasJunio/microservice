import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {SAU_PGI_AI} from "./SAU_PGI_AI";


@Entity("SAU_PGI_LOCAIS")
export class SAU_PGI_LOCAIS {

    @Column("number",{ 
        nullable:false,
        primary:true,
        name:"CD_LOCAL"
        })
    CD_LOCAL:number;
        

    @Column("number",{ 
        nullable:false,
        unique: true,
        name:"CD_CONJUNTO_USINA"
        })
    CD_CONJUNTO_USINA:number;
        

    @Column("varchar2",{ 
        nullable:false,
        unique: true,
        length:10,
        name:"SG_LOCAL"
        })
    SG_LOCAL:string;
        

    @Column("varchar2",{ 
        nullable:false,
        length:400,
        name:"NM_LOCAL"
        })
    NM_LOCAL:string;
        

    @Column("number",{ 
        nullable:false,
        name:"FL_ATIVO"
        })
    FL_ATIVO:number;
        

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
        

    @Column("varchar2",{ 
        nullable:true,
        unique: true,
        length:1,
        name:"ID_CONJUNTO_USINA"
        })
    ID_CONJUNTO_USINA:string | null;
        

   
    @OneToMany(()=>SAU_PGI_AI, (SAU_PGI_AI: SAU_PGI_AI)=>SAU_PGI_AI.cdLocal)
    sauPgiAis:SAU_PGI_AI[];
    
}