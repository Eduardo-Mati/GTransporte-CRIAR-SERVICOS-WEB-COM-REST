import promissePool from "../config/db.js";

const model = {
  findAll: async function () {
    const [result] = await promissePool.query("SELECT * FROM fleets");
    return result;
  },
  find: async function (fleet) {
    const [result] = await promissePool.query("SELECT * FROM fleets WHERE placa = ?",[fleet.placa]);
    return result;
  },
  create: async function (fleet) {
    const [result] = await promissePool.query("INSERT INTO fleets (placa, modelo, ano, capacidade, status) VALUES (?, ?, ?, ?, ?)", [fleet.placa, fleet.modelo, fleet.ano, fleet.capacidade, fleet.status]);
    return { fleetId: result.insertId, ...fleet };
  },
  update: async function (id, fleet) {
    const [result] = await promissePool.query("UPDATE fleets SET placa = ?, modelo = ?, ano = ?, capacidade = ?, status = ? WHERE fleetId = ?", [fleet.placa, fleet.modelo, fleet.ano, fleet.capacidade, fleet.status, id]);
    return { fleetId: id, ...fleet };
  },
  delete: async function (id) {
    const [result] = await promissePool.query("DELETE FROM fleets WHERE fleetId = ?",[id]);
    return result;
  },
};

export default model;
