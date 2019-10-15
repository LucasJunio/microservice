const database = require("../utils/database.js");

async function find() {
  const result = [
    {
      aprovacao: {
        title: "Aprovação",
        itens: [
          {
            id: "0",
            dataInicio: "13/09/19 09:00h",
            dataTermino: "19/09/19 17:00h",
            servico: "inspeção anual da unidade geradora",
            historico: [
              {
                titulo: "Aprovação usina",
                usuario: "João",
                data: "01/09/2019 08:57h"
              },
              {
                titulo: "Aprovação PGP",
                usuario: "Pedro",
                data: "02/09/2019 10:00h"
              },
              {
                titulo: "Aprovação OPE",
                usuario: "Maria",
                data: "05/09/2019 14:30h"
              }
            ]
          },
          {
            id: "1",
            dataInicio: "13/09/19 09:00h",
            dataTermino: "19/09/19 17:00h",
            servico: "inspeção anual da unidade geradora",
            historico: [
              {
                titulo: "Aprovação usina",
                usuario: "João",
                data: "01/09/2019 08:57h"
              },
              {
                titulo: "Aprovação PGP",
                usuario: "Pedro",
                data: "02/09/2019 10:00h"
              },
              {
                titulo: "Aprovação OPE",
                usuario: "Maria",
                data: "05/09/2019 14:30h"
              }
            ]
          }
        ]
      },
      reprogramacao: {
        title: "Reprogramação",
        itens: [
          {
            id: "2",
            dataInicio: "25/09/19 09:00h",
            dataTermino: "05/10/19 17:00h",
            justificativa:
              "verificação da necessidade de manutenção no gerador",
            servico:
              "inspeção anual da unidade geradora + manutenção de efeito corona do gerador",
            historico: [
              {
                titulo: "Aprovação usina",
                usuario: "João",
                data: "10/09/2019 08:57h"
              },
              {
                titulo: "Aprovação PGP",
                usuario: "Pedro",
                data: "10/09/2019 10:00h"
              },
              {
                titulo: "Aprovação OPE",
                usuario: "Maria",
                data: "10/09/2019 14:30h"
              }
            ]
          },
          {
            id: "3",
            dataInicio: "25/09/19 09:00h",
            dataTermino: "05/10/19 17:00h",
            justificativa:
              "verificação da necessidade de manutenção no gerador",
            servico:
              "inspeção anual da unidade geradora + manutenção de efeito corona do gerador",
            historico: [
              {
                titulo: "Aprovação usina",
                usuario: "João",
                data: "10/09/2019 08:57h"
              },
              {
                titulo: "Devolvido inicio fluxo PGP",
                usuario: "Pedro",
                data: "10/09/2019 10:00h"
              }
            ]
          }
        ]
      },
      cancelamento: {
        title: "Cancelamento",
        itens: [
          {
            id: "4",
            data: "25/09/2019",
            usuario: "Maria",
            justificativa:
              "decisão alta direção em postergar a manutenção para efetuar modernização da unidade geradora em 2021",
            historico: [
              {
                titulo: "Aprovação usina",
                usuario: "João",
                data: "26/10/2019 08:57h"
              },
              {
                titulo: "Aprovação PGP",
                usuario: "Pedro",
                data: "27/10/2019 10:00h"
              },
              {
                titulo: "Aprovação OPE",
                usuario: "Maria",
                data: "30/10/2019 14:30h"
              }
            ]
          }
        ]
      }
    }
  ];

  return result;
}

module.exports.find = find;
