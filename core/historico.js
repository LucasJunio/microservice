const database = require("../utils/database.js");

async function find() {
  const result = [
    {
      aprovacao: [
        {
          id: "0",
          nome: "JOSE VICENTE MIRANDA RESCIGNO",
          dominio: "GPP_UsuárioChave",
          chave: "UsuarioChave",
          data: "28/05/19 - 11:48h",
          status: "Aprovado",
          historico: [
            {
              titulo: "Aprovação usina",
              usuario: "João",
              data: "10/09/2019 08:57h"
            },
            {
              titulo: "Aprovação usina",
              usuario: "João",
              data: "10/09/2019 08:57h"
            },
            {
              titulo: "Aprovação usina",
              usuario: "João",
              data: "10/09/2019 08:57h"
            }
          ]
        },
        {
          id: "1",
          nome: "JOSE VICENTE MIRANDA RESCIGNO",
          dominio: "GPP_UsuárioChave",
          chave: "UsuarioChave",
          data: "28/05/19 - 11:48h",
          status: "Aprovado",
          historico: [
            {
              titulo: "Aprovação usina",
              usuario: "João",
              data: "10/09/2019 08:57h"
            },
            {
              titulo: "Aprovação usina",
              usuario: "João",
              data: "10/09/2019 08:57h"
            }
          ]
        },
        {
          id: "2",
          nome: "JOSE VICENTE MIRANDA RESCIGNO",
          dominio: "GPP_UsuárioChave",
          chave: "UsuarioChave",
          data: "28/05/19 - 11:48h",
          status: "Aprovado",
          historico: []
        }
      ],
      reprogramacao: [
        {
          id: "3",
          nome: "JOSE VICENTE MIRANDA RESCIGNO",
          dominio: "GPP_UsuárioChave",
          chave: "UsuarioChave",
          data: "28/05/19 - 11:48h",
          status: "Aprovado",
          historico: [
            {
              titulo: "Aprovação usina",
              usuario: "João",
              data: "10/09/2019 08:57h"
            },
            {
              titulo: "Aprovação usina",
              usuario: "João",
              data: "10/09/2019 08:57h"
            },
            {
              titulo: "Aprovação usina",
              usuario: "João",
              data: "10/09/2019 08:57h"
            }
          ]
        },
        {
          id: "4",
          nome: "JOSE VICENTE MIRANDA RESCIGNO",
          dominio: "GPP_UsuárioChave",
          chave: "UsuarioChave",
          data: "28/05/19 - 11:48h",
          status: "Aprovado",
          historico: [
            {
              titulo: "Aprovação usina",
              usuario: "João",
              data: "10/09/2019 08:57h"
            },
            {
              titulo: "Aprovação usina",
              usuario: "João",
              data: "10/09/2019 08:57h"
            }
          ]
        },
        {
          id: "5",
          nome: "JOSE VICENTE MIRANDA RESCIGNO",
          dominio: "GPP_UsuárioChave",
          chave: "UsuarioChave",
          data: "28/05/19 - 11:48h",
          status: "Aprovado",
          historico: []
        }
      ],
      cancelamento: [
        {
          id: "6",
          nome: "JOSE VICENTE MIRANDA RESCIGNO",
          dominio: "GPP_UsuárioChave",
          chave: "UsuarioChave",
          data: "28/05/19 - 11:48h",
          status: "Aprovado",
          historico: [
            {
              titulo: "Aprovação usina",
              usuario: "João",
              data: "10/09/2019 08:57h"
            },
            {
              titulo: "Aprovação usina",
              usuario: "João",
              data: "10/09/2019 08:57h"
            },
            {
              titulo: "Aprovação usina",
              usuario: "João",
              data: "10/09/2019 08:57h"
            }
          ]
        }
      ]
    }
  ];

  return result;
}

module.exports.find = find;
