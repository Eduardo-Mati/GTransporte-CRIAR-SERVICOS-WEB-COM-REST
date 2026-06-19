import promissePool from "../config/db.js";

const model = {
  findAll: async function () {
    const [result] = await promissePool.query("SELECT * FROM users");
    return result;
  },
  find: async function (user) {
    const [result] = await promissePool.query("SELECT * FROM users WHERE email = ?",[user.email]);
    return result;
  },
  create: async function (user) {
    const [result] = await promissePool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",[user.name, user.email, user.password]);
    return { personId: result.insertId, ...user };
  },
  update: async function (id, user) {
    const [result] = await promissePool.query("UPDATE users SET name = ?, email = ?, password = ? WHERE personId = ?",[user.name, user.email, user.password, id]);
    return { personId: id, ...user };
  },
  delete: async function (id) {
    const [result] = await promissePool.query("DELETE FROM users WHERE personId = ?",[id]);
    return result;
  },
};

export default model;
