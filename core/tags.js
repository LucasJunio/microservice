const database = require("../utils/database.js");

async function findTags() {
  const result = [
    {
      buttons: {
        save: true,
        search: true,
        new: true,
        restartFlow: true,
        approveFlow: true,
        linkCancel: true,
        reprogramming: true
      },
      collapses: {
        identificacao: false,
        historico: false,
        programacao: false,
        execucao: false,
        cancelamento: false,
        reprogramacao: true,
        linkReprogramacao: false
      }
    }
  ];
  return result;
}

module.exports.findTags = findTags;
