import promissePool from "../config/db.js";

const model = {
  find: async function (driver) {
    const [result] = await promissePool.query("SELECT * FROM drivers WHERE nome = ?", [driver.nome]);
    return result;
  },
  create: async function (driver) {
    const [result] = await promissePool.query("INSERT INTO drivers (nome, cnh, categoria, telefone, status) VALUES (?, ?, ?, ?, ?)", [driver.nome, driver.cnh, driver.categoria, driver.telefone, driver.status]);
    return { driverId: result.insertId, ...driver };
  },
  update: async function (id, driver) {
    const [result] = await promissePool.query("UPDATE drivers SET nome = ?, cnh = ?, categoria = ?, telefone = ?, status = ? WHERE driverId = ?", [driver.nome, driver.cnh, driver.categoria, driver.telefone, driver.status, id]);
    return { driverId: id, ...driver };
  },
  delete: async function (id) {
    const [result] = await promissePool.query("DELETE FROM drivers WHERE driverId = ?", [id]);
    return result;
  },
};

export default model;
