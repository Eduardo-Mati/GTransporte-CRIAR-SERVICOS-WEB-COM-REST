import promissePool from "../config/db.js";

const model = {
  findAll: async function () {
    const [result] = await promissePool.query("SELECT * FROM reports");
    return result;
  },
  find: async function (report) {
    const [result] = await promissePool.query("SELECT * FROM reports WHERE travelId = ?",[report.travelId]);
    return result;
  },
  create: async function (report) {
    const [result] = await promissePool.query("INSERT INTO reports (travelId, userId, content) VALUES (?, ?, ?)",[report.travelId, report.userId, report.content]);
    return { reportId: result.insertId, ...report };
  },
  update: async function (id, report) {
    const [result] = await promissePool.query("UPDATE reports SET travelId = ?, userId = ?, content = ? WHERE reportId = ?",[report.travelId, report.userId, report.content, id]);
    return { reportId: id, ...report };
  },
  delete: async function (id) {
    const [result] = await promissePool.query("DELETE FROM reports WHERE reportId = ?",[id]);
    return result;
  },
};

export default model;
