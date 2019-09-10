const chai = require("chai");
const verify = require("../utils/verifyType");

const data = {
  targetDate: "2019-10-10 10:50:00",
  refDate: "2019-10-20 10:50:00",
  annualDate: "2018-08-31T03:00:00.000Z",
  scheduledDate: "2018-08-31T03:00:00.000Z",
  urgentDeadline: "2",
  years: "2"
};

describe("Teste das funcoes - Tipo de Parada Programada", () => {
  it("Verifica se o tipo retorna PI - Intempestiva", () => {
    const type = verify.verifyType(data);
    chai.expect(type).to.equal("PI");
  });

  it("Verifica se o tipo retorna PI - Intempestiva", () => {
    const type = verify.verifyType({
      ...data,
      refDate: "2019-10-10 10:50:00"
    });
    chai.expect(type).to.equal("PI");
  });

  it("Verifica se o tipo retorna PP - Programada", () => {
    const type = verify.verifyType({
      ...data,
      targetDate: "2019-11-21 10:50:00"
    });
    chai.expect(type).to.equal("PP");
  });

  it("Verifica se o tipo retorna PU - Urgente", () => {
    const type = verify.verifyType({
      ...data,
      targetDate: "2019-10-21 10:50:00"
    });
    chai.expect(type).to.equal("PU");
  });

  it("Verifica se o tipo retorna PL - Longo Prazo", () => {
    const type = verify.verifyType({
      ...data,
      targetDate: "2021-10-10 10:50:00",
      annualDate: "2020-08-31T03:00:00.000Z",
      scheduledDate: "2020-08-31T03:00:00.000Z"
    });
    chai.expect(type).to.equal("PL");
  });

  it("Verifica se o tipo retorna PL - Longo Prazo", () => {
    const type = verify.verifyType({
      ...data,
      targetDate: "2022-10-10 10:50:00",
      annualDate: "2020-08-31T03:00:00.000Z",
      scheduledDate: "2020-08-31T03:00:00.000Z"
    });
    chai.expect(type).to.equal("PL");
  });

  it("Verifica se o tipo retorna PA - Anual", () => {
    const type = verify.verifyType({
      ...data,
      targetDate: "2020-10-10 10:50:00",
      annualDate: "2021-08-31T03:00:00.000Z",
      scheduledDate: "2021-08-31T03:00:00.000Z"
    });
    chai.expect(type).to.equal("PA");
  });
});
