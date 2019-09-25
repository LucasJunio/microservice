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
  it("Deve retornar o tipo retorna PI quando data atual é maior que a data de inicio de programação", () => {
    const type = verify.verifyType(data);
    chai.expect(type).to.equal("PI");
  });

  it("Deve retornar o tipo retorna PI quando data atual é igual a data de inicio de programação", () => {
    const type = verify.verifyType({
      ...data,
      refDate: "2019-10-10 10:50:00"
    });
    chai.expect(type).to.equal("PI");
  });

  it("Deve retornar o tipo retorna PP", () => {
    const type = verify.verifyType({
      ...data,
      targetDate: "2019-11-21 10:50:00"
    });
    chai.expect(type).to.equal("PP");
  });

  it("Deve retornar o tipo retorna PU", () => {
    const type = verify.verifyType({
      ...data,
      targetDate: "2019-10-21 10:50:00"
    });
    chai.expect(type).to.equal("PU");
  });

  it("Deve retornar o tipo retorna PL, quando o ano atual + ano parada de longo prazo é igual o ano de inicio de programação", () => {
    const type = verify.verifyType({
      ...data,
      targetDate: "2021-10-10 10:50:00",
      annualDate: "2020-08-31T03:00:00.000Z",
      scheduledDate: "2020-08-31T03:00:00.000Z"
    });
    chai.expect(type).to.equal("PL");
  });

  it("Deve retornar o tipo retorna PL, quando o ano atual + ano parada de longo prazo é menor o ano de inicio de programação", () => {
    const type = verify.verifyType({
      ...data,
      targetDate: "2022-10-10 10:50:00",
      annualDate: "2020-08-31T03:00:00.000Z",
      scheduledDate: "2020-08-31T03:00:00.000Z"
    });
    chai.expect(type).to.equal("PL");
  });

  it("Deve retornar o tipo retorna PL, com ano vazio", () => {
    const type = verify.verifyType({
      ...data,
      targetDate: "2022-10-10 10:50:00",
      annualDate: "2020-08-31T03:00:00.000Z",
      scheduledDate: "2020-08-31T03:00:00.000Z",
      years: undefined
    });
    chai.expect(type).to.equal("PL");
  });

  it("Deve retornar o tipo retorna PA - Anual", () => {
    const type = verify.verifyType({
      ...data,
      targetDate: "2020-10-10 10:50:00",
      annualDate: "2021-08-31T03:00:00.000Z",
      scheduledDate: "2021-08-31T03:00:00.000Z"
    });
    chai.expect(type).to.equal("PA");
  });

  it("Deve retornar o tipo retorna PA, com ano vazio", () => {
    const type = verify.verifyType({
      ...data,
      targetDate: "2020-10-10 10:50:00",
      annualDate: "2021-08-31T03:00:00.000Z",
      scheduledDate: "2021-08-31T03:00:00.000Z",
      years: undefined
    });
    chai.expect(type).to.equal("PA");
  });
});
