import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {SAU_PROGRAMACAO_PARADA} from "./SAU_PROGRAMACAO_PARADA";


@Entity("SAU_HIST_PROGRAMACAO_PARADA")
export class SAU_HIST_PROGRAMACAO_PARADA {

    @Column("varchar2",{ 
        nullable:true,
        length:4000,
        name:"DS_ACAO"
        })
    DS_ACAO:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:4000,
        name:"DS_OBSERVACAO"
        })
    DS_OBSERVACAO:string | null;
        

    @Column("timestamp with local time zone",{ 
        nullable:true,
        name:"DATE_CREATE"
        })
    DATE_CREATE:Date | null;
        

    @Column("timestamp with local time zone",{ 
        nullable:true,
        name:"DT_HISTORICO"
        })
    DT_HISTORICO:Date | null;
        

    @Column("number",{ 
        nullable:false,
        primary:true,
        name:"CD_HISTORICO"
        })
    CD_HISTORICO:number;
        

    @Column("varchar2",{ 
        nullable:true,
        length:30,
        name:"CD_USUARIO"
        })
    CD_USUARIO:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:30,
        name:"USER_CREATE"
        })
    USER_CREATE:string | null;

    @Column("varchar2",{ 
        nullable:true,
        length:30,
        name:"FLOW"
        })
    FLOW:string | null;
        

   
    @ManyToOne(()=>SAU_PROGRAMACAO_PARADA, (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA)=>SAU_PROGRAMACAO_PARADA.sauHistProgramacaoParadas,{  nullable:false, })
    @JoinColumn({ name:'CD_PROGRAMACAO_PARADA'})
    cdProgramacaoParada:SAU_PROGRAMACAO_PARADA | null;

}