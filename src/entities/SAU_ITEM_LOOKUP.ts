import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {SAU_LOOKUP} from "./SAU_LOOKUP";
import {SAU_CLASSIFICACAO_PARADA} from "./SAU_CLASSIFICACAO_PARADA";
import {SAU_DETALHAMENTO_EXECUCAO_DOCS} from "./SAU_DETALHAMENTO_EXECUCAO_DOCS";
import {SAU_EQUIPAMENTO_PGI} from "./SAU_EQUIPAMENTO_PGI";
import {SAU_EXECUCAO_DIARIA_DOCS} from "./SAU_EXECUCAO_DIARIA_DOCS";
import {SAU_PGI} from "./SAU_PGI";
import {SAU_PGI_AI} from "./SAU_PGI_AI";
import {SAU_PROGRAMACAO_PARADA} from "./SAU_PROGRAMACAO_PARADA";
import {SAU_PRORROGACAO_DOCS} from "./SAU_PRORROGACAO_DOCS";
import {SAU_REPROGRAMACAO_PARADA} from "./SAU_REPROGRAMACAO_PARADA";
import {SAU_SUBCLASSIFICACAO_PARADA} from "./SAU_SUBCLASSIFICACAO_PARADA";


@Entity("SAU_ITEM_LOOKUP")
export class SAU_ITEM_LOOKUP {

    @Column("number",{ 
        nullable:false,
        primary:true,
        name:"CD_ITEM_LOOKUP"
        })
    CD_ITEM_LOOKUP:number;
        

   
    @ManyToOne(()=>SAU_LOOKUP, (SAU_LOOKUP: SAU_LOOKUP)=>SAU_LOOKUP.sauItemLookups,{  nullable:false, })
    @JoinColumn({ name:'CD_LOOKUP'})
    cdLookup:SAU_LOOKUP | null;


    @Column("varchar2",{ 
        nullable:false,
        unique: true,
        length:30,
        name:"ID_ITEM_LOOKUP"
        })
    ID_ITEM_LOOKUP:string;
        

    @Column("varchar2",{ 
        nullable:false,
        length:400,
        name:"DS_ITEM_LOOKUP"
        })
    DS_ITEM_LOOKUP:string;
        

    @Column("number",{ 
        nullable:true,
        default: () => "1",
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
        nullable:true,
        default: () => "0",
        name:"VERSION"
        })
    VERSION:number | null;
        

   
    @OneToMany(()=>SAU_CLASSIFICACAO_PARADA, (SAU_CLASSIFICACAO_PARADA: SAU_CLASSIFICACAO_PARADA)=>SAU_CLASSIFICACAO_PARADA.idAplicacaoParada)
    sauClassificacaoParadas:SAU_CLASSIFICACAO_PARADA[];
    

   
    @OneToMany(()=>SAU_DETALHAMENTO_EXECUCAO_DOCS, (SAU_DETALHAMENTO_EXECUCAO_DOCS: SAU_DETALHAMENTO_EXECUCAO_DOCS)=>SAU_DETALHAMENTO_EXECUCAO_DOCS.idTipoDocumento)
    sauDetalhamentoExecucaoDocss:SAU_DETALHAMENTO_EXECUCAO_DOCS[];
    

   
    @OneToMany(()=>SAU_EQUIPAMENTO_PGI, (SAU_EQUIPAMENTO_PGI: SAU_EQUIPAMENTO_PGI)=>SAU_EQUIPAMENTO_PGI.cdLocal)
    sauEquipamentoPgis:SAU_EQUIPAMENTO_PGI[];
    

   
    @OneToMany(()=>SAU_EQUIPAMENTO_PGI, (SAU_EQUIPAMENTO_PGI: SAU_EQUIPAMENTO_PGI)=>SAU_EQUIPAMENTO_PGI.idUnidadeMedida)
    sauEquipamentoPgis2:SAU_EQUIPAMENTO_PGI[];
    

   
    @OneToMany(()=>SAU_EXECUCAO_DIARIA_DOCS, (SAU_EXECUCAO_DIARIA_DOCS: SAU_EXECUCAO_DIARIA_DOCS)=>SAU_EXECUCAO_DIARIA_DOCS.idTipoDocumento)
    sauExecucaoDiariaDocss:SAU_EXECUCAO_DIARIA_DOCS[];
    

   
    @OneToMany(()=>SAU_PGI, (SAU_PGI: SAU_PGI)=>SAU_PGI.idCaracterizacao)
    sauPgis:SAU_PGI[];
    

   
    @OneToMany(()=>SAU_PGI, (SAU_PGI: SAU_PGI)=>SAU_PGI.idClassifiIntervencao)
    sauPgis2:SAU_PGI[];
    

   
    @OneToMany(()=>SAU_PGI, (SAU_PGI: SAU_PGI)=>SAU_PGI.idNatureza)
    sauPgis3:SAU_PGI[];
    

   
    @OneToMany(()=>SAU_PGI, (SAU_PGI: SAU_PGI)=>SAU_PGI.idPeriodicidade)
    sauPgis4:SAU_PGI[];
    

   
    @OneToMany(()=>SAU_PGI, (SAU_PGI: SAU_PGI)=>SAU_PGI.idStatus)
    sauPgis5:SAU_PGI[];
    

   
    @OneToMany(()=>SAU_PGI, (SAU_PGI: SAU_PGI)=>SAU_PGI.idTempoRetorno)
    sauPgis6:SAU_PGI[];
    

   
    @OneToMany(()=>SAU_PGI, (SAU_PGI: SAU_PGI)=>SAU_PGI.idTipoCadastro)
    sauPgis7:SAU_PGI[];
    

   
    @OneToMany(()=>SAU_PGI, (SAU_PGI: SAU_PGI)=>SAU_PGI.idTipo)
    sauPgis8:SAU_PGI[];
    

   
    @OneToMany(()=>SAU_PGI_AI, (SAU_PGI_AI: SAU_PGI_AI)=>SAU_PGI_AI.idClassificacaoImpedimento)
    sauPgiAis:SAU_PGI_AI[];
    

   
    @OneToMany(()=>SAU_PGI_AI, (SAU_PGI_AI: SAU_PGI_AI)=>SAU_PGI_AI.idPeriodicidade)
    sauPgiAis2:SAU_PGI_AI[];
    

   
    @OneToMany(()=>SAU_PGI_AI, (SAU_PGI_AI: SAU_PGI_AI)=>SAU_PGI_AI.idStatus)
    sauPgiAis3:SAU_PGI_AI[];
    

   
    @OneToMany(()=>SAU_PROGRAMACAO_PARADA, (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA)=>SAU_PROGRAMACAO_PARADA.idStatusCancelamento)
    sauProgramacaoParadas:SAU_PROGRAMACAO_PARADA[];
    

   
    @OneToMany(()=>SAU_PROGRAMACAO_PARADA, (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA)=>SAU_PROGRAMACAO_PARADA.idStatus)
    sauProgramacaoParadas2:SAU_PROGRAMACAO_PARADA[];
    

   
    @OneToMany(()=>SAU_PROGRAMACAO_PARADA, (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA)=>SAU_PROGRAMACAO_PARADA.idTipoParada)
    sauProgramacaoParadas3:SAU_PROGRAMACAO_PARADA[];
    

   
    @OneToMany(()=>SAU_PROGRAMACAO_PARADA, (SAU_PROGRAMACAO_PARADA: SAU_PROGRAMACAO_PARADA)=>SAU_PROGRAMACAO_PARADA.idTipoProgramacao)
    sauProgramacaoParadas4:SAU_PROGRAMACAO_PARADA[];
    

   
    @OneToMany(()=>SAU_PRORROGACAO_DOCS, (SAU_PRORROGACAO_DOCS: SAU_PRORROGACAO_DOCS)=>SAU_PRORROGACAO_DOCS.idTipoDocumento)
    sauProrrogacaoDocss:SAU_PRORROGACAO_DOCS[];
    

   
    @OneToMany(()=>SAU_REPROGRAMACAO_PARADA, (SAU_REPROGRAMACAO_PARADA: SAU_REPROGRAMACAO_PARADA)=>SAU_REPROGRAMACAO_PARADA.idMotivoReprogramacao)
    sauReprogramacaoParadas:SAU_REPROGRAMACAO_PARADA[];
    

   
    @OneToMany(()=>SAU_REPROGRAMACAO_PARADA, (SAU_REPROGRAMACAO_PARADA: SAU_REPROGRAMACAO_PARADA)=>SAU_REPROGRAMACAO_PARADA.idOrigemReprogramacao)
    sauReprogramacaoParadas2:SAU_REPROGRAMACAO_PARADA[];
    

   
    @OneToMany(()=>SAU_REPROGRAMACAO_PARADA, (SAU_REPROGRAMACAO_PARADA: SAU_REPROGRAMACAO_PARADA)=>SAU_REPROGRAMACAO_PARADA.idStatusReprogramacao)
    sauReprogramacaoParadas3:SAU_REPROGRAMACAO_PARADA[];
    

   
    @OneToMany(()=>SAU_SUBCLASSIFICACAO_PARADA, (SAU_SUBCLASSIFICACAO_PARADA: SAU_SUBCLASSIFICACAO_PARADA)=>SAU_SUBCLASSIFICACAO_PARADA.idAplicacaoUsina)
    sauSubclassificacaoParadas:SAU_SUBCLASSIFICACAO_PARADA[];
    
}