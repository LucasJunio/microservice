import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {SAU_ITEM_LOOKUP} from "./SAU_ITEM_LOOKUP";
import {SAU_CLASSIFICACAO_PARADA} from "./SAU_CLASSIFICACAO_PARADA";
import {SAU_SUBCLASSIFICACAO_PARADA} from "./SAU_SUBCLASSIFICACAO_PARADA";
import {SAU_HIST_PROGRAMACAO_PARADA} from "./SAU_HIST_PROGRAMACAO_PARADA";
import {SAU_PGI} from "./SAU_PGI";
import {SAU_PROGRAMACAO_PARADA_UG} from "./SAU_PROGRAMACAO_PARADA_UG";
import { SAU_USINA } from "./SAU_USINA";


@Entity("SAU_PROGRAMACAO_PARADA")
@Index("SAU_PROGRAMACAO_PARADA_IX1",["CD_CONJUNTO_USINA","DT_HORA_INICIO_REPROGRAMACAO",])
export class SAU_PROGRAMACAO_PARADA {

    @Column("number",{ 
        nullable:false,
        primary:true,
        name:"CD_PROGRAMACAO_PARADA"
        })
    CD_PROGRAMACAO_PARADA:number;
        

    @Column("number",{ 
        nullable:false,
        unique: true,
        name:"CD_PARADA"
        })
    CD_PARADA:number;
        
    //campo virtual, serve apenas para alimentar o front
    usina: any;

    @Column("number",{ 
        nullable:false,
        unique: true,
        name:"CD_CONJUNTO_USINA"
        })
    CD_CONJUNTO_USINA:number;
        

    @Column('timestamp with local time zone',{ 
        nullable:true,
        name:"DT_CRIACAO_PARADA"
        })
    DT_CRIACAO_PARADA:Date | null;
        

   
    @ManyToOne(()=>SAU_ITEM_LOOKUP, (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP)=>SAU_ITEM_LOOKUP.sauProgramacaoParadas6,{  })
    @JoinColumn({ name:'ID_TIPO_PARADA'})
    idTipoParada:SAU_ITEM_LOOKUP | null;


   
    @ManyToOne(()=>SAU_ITEM_LOOKUP, (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP)=>SAU_ITEM_LOOKUP.sauProgramacaoParadas4,{  })
    @JoinColumn({ name:'ID_STATUS'})
    idStatus:SAU_ITEM_LOOKUP | null;


    @Column('timestamp with local time zone',{ 
        nullable:false,
        name:"DT_HORA_INICIO_PROGRAMACAO"
        })
    DT_HORA_INICIO_PROGRAMACAO:Date;
        

    @Column('timestamp with local time zone',{ 
        nullable:false,
        name:"DT_HORA_TERMINO_PROGRAMACAO"
        })
    DT_HORA_TERMINO_PROGRAMACAO:Date;
        

   
    @ManyToOne(()=>SAU_ITEM_LOOKUP, (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP)=>SAU_ITEM_LOOKUP.sauProgramacaoParadas7,{  })
    @JoinColumn({ name:'ID_TIPO_PROGRAMACAO'})
    idTipoProgramacao:SAU_ITEM_LOOKUP | null;


    @Column("varchar2",{ 
        nullable:true,
        length:15,
        name:"NM_AREA_ORIGEM"
        })
    NM_AREA_ORIGEM:string | null;
        

   
    @ManyToOne(()=>SAU_CLASSIFICACAO_PARADA, (SAU_CLASSIFICACAO_PARADA: SAU_CLASSIFICACAO_PARADA)=>SAU_CLASSIFICACAO_PARADA.sauProgramacaoParadas,{  nullable:false, })
    @JoinColumn({ name:'CD_CLASSIFICACAO_PROGR_PARADA'})
    cdClassificacaoProgrParada:SAU_CLASSIFICACAO_PARADA | null;


   
    @ManyToOne(()=>SAU_SUBCLASSIFICACAO_PARADA, (SAU_SUBCLASSIFICACAO_PARADA: SAU_SUBCLASSIFICACAO_PARADA)=>SAU_SUBCLASSIFICACAO_PARADA.sauProgramacaoParadas,{  })
    @JoinColumn({ name:'CD_SUBCLASSIF_PROGR_PARADA'})
    cdSubclassifProgrParada:SAU_SUBCLASSIFICACAO_PARADA | null;


    @Column("varchar2",{ 
        nullable:true,
        length:240,
        name:"DS_PROGRAMACAO_PARADA"
        })
    DS_PROGRAMACAO_PARADA:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:2500,
        name:"DS_OBSERVACAO"
        })
    DS_OBSERVACAO:string | null;
        

    @Column('timestamp with local time zone',{ 
        nullable:true,
        name:"DT_HORA_INICIO_SERVICO"
        })
    DT_HORA_INICIO_SERVICO:Date | null;
        

    @Column('timestamp with local time zone',{ 
        nullable:true,
        name:"DT_HORA_TERMINO_SERVICO"
        })
    DT_HORA_TERMINO_SERVICO:Date | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:500,
        name:"DS_SERVICO_EXECUTADO"
        })
    DS_SERVICO_EXECUTADO:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:50,
        name:"DS_NUM_CEL_ANEEL"
        })
    DS_NUM_CEL_ANEEL:string | null;
        

    @Column("number",{ 
        nullable:true,
        default: () => "0",
        precision:1,
        scale:0,
        name:"FL_COMUNICAR_ANEEL"
        })
    FL_COMUNICAR_ANEEL:number | null;
        

    @Column('timestamp with local time zone',{ 
        nullable:true,
        name:"DT_CANCELAMENTO"
        })
    DT_CANCELAMENTO:Date | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:70,
        name:"DS_MOTIVO_CANCELAMENTO"
        })
    DS_MOTIVO_CANCELAMENTO:string | null;
        

   
    @ManyToOne(()=>SAU_ITEM_LOOKUP, (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP)=>SAU_ITEM_LOOKUP.sauProgramacaoParadas3,{  })
    @JoinColumn({ name:'ID_STATUS_CANCELAMENTO'})
    idStatusCancelamento:SAU_ITEM_LOOKUP | null;


    @Column("varchar2",{ 
        nullable:true,
        length:15,
        name:"NM_AREA_ORIGEM_CANCELAMENTO"
        })
    NM_AREA_ORIGEM_CANCELAMENTO:string | null;
        

    @Column('timestamp with local time zone',{ 
        nullable:true,
        name:"DT_HORA_INICIO_REPROGRAMACAO"
        })
    DT_HORA_INICIO_REPROGRAMACAO:Date | null;
        

    @Column('timestamp with local time zone',{ 
        nullable:true,
        name:"DT_HORA_TERMINO_REPROGRAMACAO"
        })
    DT_HORA_TERMINO_REPROGRAMACAO:Date | null;
        

   
    @ManyToOne(()=>SAU_ITEM_LOOKUP, (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP)=>SAU_ITEM_LOOKUP.sauProgramacaoParadas5,{  })
    @JoinColumn({ name:'ID_STATUS_REPROGRAMACAO'})
    idStatusReprogramacao:SAU_ITEM_LOOKUP | null;


   
    @ManyToOne(()=>SAU_ITEM_LOOKUP, (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP)=>SAU_ITEM_LOOKUP.sauProgramacaoParadas2,{  })
    @JoinColumn({ name:'ID_ORIGEM_REPROGRAMACAO'})
    idOrigemReprogramacao:SAU_ITEM_LOOKUP | null;


   
    @ManyToOne(()=>SAU_ITEM_LOOKUP, (SAU_ITEM_LOOKUP: SAU_ITEM_LOOKUP)=>SAU_ITEM_LOOKUP.sauProgramacaoParadas,{  })
    @JoinColumn({ name:'ID_MOTIVO_REPROGRAMACAO'})
    idMotivoReprogramacao:SAU_ITEM_LOOKUP | null;


    @Column("varchar2",{ 
        nullable:true,
        length:240,
        name:"DS_MOTIVO_REPROGRAMACAO"
        })
    DS_MOTIVO_REPROGRAMACAO:string | null;
        

   
    @ManyToOne(()=>SAU_CLASSIFICACAO_PARADA, (SAU_CLASSIFICACAO_PARADA: SAU_CLASSIFICACAO_PARADA)=>SAU_CLASSIFICACAO_PARADA.sauProgramacaoParadas2,{  })
    @JoinColumn({ name:'CD_CLASSIF_REPROGR_PARADA'})
    cdClassifReprogrParada:SAU_CLASSIFICACAO_PARADA | null;


   
    @ManyToOne(()=>SAU_SUBCLASSIFICACAO_PARADA, (SAU_SUBCLASSIFICACAO_PARADA: SAU_SUBCLASSIFICACAO_PARADA)=>SAU_SUBCLASSIFICACAO_PARADA.sauProgramacaoParadas2,{  })
    @JoinColumn({ name:'CD_SUBCLAS_REPROGR_PARADA'})
    cdSubclasReprogrParada:SAU_SUBCLASSIFICACAO_PARADA | null;


    @Column("varchar2",{ 
        nullable:true,
        length:240,
        name:"DS_NOVA_DESCRICAO_PROGR_PARADA"
        })
    DS_NOVA_DESCRICAO_PROGR_PARADA:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:2500,
        name:"DS_OBSERVACAO_REPROGR_PARADA"
        })
    DS_OBSERVACAO_REPROGR_PARADA:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:15,
        name:"NM_AREA_ORIGEM_REPROGRAMACAO"
        })
    NM_AREA_ORIGEM_REPROGRAMACAO:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:30,
        name:"CD_USUARIO_CONCLUSAO"
        })
    CD_USUARIO_CONCLUSAO:string | null;
        

    @Column('timestamp with local time zone',{ 
        nullable:true,
        name:"DT_CONCLUSAO"
        })
    DT_CONCLUSAO:Date | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:30,
        name:"CD_USUARIO_CANCELAMENTO"
        })
    CD_USUARIO_CANCELAMENTO:string | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:1,
        name:"ID_STATUS_PROGRAMACAO"
        })
    ID_STATUS_PROGRAMACAO:string | null;
        

    @Column("number",{ 
        nullable:true,
        default: () => "0",
        precision:1,
        scale:0,
        name:"FL_REINICIAR_FLUXO"
        })
    FL_REINICIAR_FLUXO:number | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:400,
        name:"DS_LOG_STATUS"
        })
    DS_LOG_STATUS:string | null;
        

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
        nullable:true,
        precision:5,
        scale:0,
        name:"NR_REPROGRAMACOES_APROVADAS"
        })
    NR_REPROGRAMACOES_APROVADAS:number | null;
        

    @Column("varchar2",{ 
        nullable:true,
        length:1,
        name:"ID_CONJUNTO_USINA"
        })
    ID_CONJUNTO_USINA:string | null;
        

    @Column("number",{ 
        nullable:true,
        default: () => "0",
        name:"VERSION"
        })
    VERSION:number | null;
        

   
    @OneToMany(()=>SAU_HIST_PROGRAMACAO_PARADA, (SAU_HIST_PROGRAMACAO_PARADA: SAU_HIST_PROGRAMACAO_PARADA)=>SAU_HIST_PROGRAMACAO_PARADA.cdProgramacaoParada)
    sauHistProgramacaoParadas:SAU_HIST_PROGRAMACAO_PARADA[];
    

   
    @OneToMany(()=>SAU_PGI, (SAU_PGI: SAU_PGI)=>SAU_PGI.cdProgramacaoParada)
    sauPgis:SAU_PGI[];
    

   
    @OneToMany(()=>SAU_PROGRAMACAO_PARADA_UG, (SAU_PROGRAMACAO_PARADA_UG: SAU_PROGRAMACAO_PARADA_UG)=>SAU_PROGRAMACAO_PARADA_UG.cdProgramacaoParada)
    sauProgramacaoParadaUgs:SAU_PROGRAMACAO_PARADA_UG[];
    
}