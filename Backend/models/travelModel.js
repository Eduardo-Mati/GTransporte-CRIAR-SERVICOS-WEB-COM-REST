import promissePool from "../config/db.js";

const model = {
  findAll: async function () {
    const [result] = await promissePool.query("SELECT * FROM travels");
    return result;
  },
  find: async function (travel) {
    const [result] = await promissePool.query("SELECT * FROM travels WHERE origem = ?",[travel.origem]);
    return result;
  },
  create: async function (travel) {
    const [result] = await promissePool.query("INSERT INTO travels (origem, destino, veiculo_id, motorista_id, status) VALUES (?, ?, ?, ?, ?)",[travel.origem, travel.destino, travel.veiculo_id, travel.motorista_id, travel.status]);
    return { travelId: result.insertId, ...travel };
  },
  update: async function (id, travel) {
    const [result] = await promissePool.query("UPDATE travels SET origem = ?, destino = ?, veiculo_id = ?, motorista_id = ?, status = ? WHERE travelId = ?",[travel.origem, travel.destino, travel.veiculo_id, travel.motorista_id, travel.status, id]);
    return { travelId: id, ...travel };
  },
  delete: async function (id) {
    const [result] = await promissePool.query("DELETE FROM travels WHERE travelId = ?",[id]);
    return result;
  },
};

export default model;
