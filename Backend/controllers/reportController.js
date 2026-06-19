import reportModel from "../models/reportModel.js";

const controller = {
  getAll: (req, res) => {
    const reports = reportModel.findAll();
    res.send(reports);
  },
  getById: (req, res) => {
    const report = reportModel.find(req.params.id);
    res.send(report);
  },
  create: (req, res) => {
    const report = req.body;
    const newReport = reportModel.create(report);
    res.status(201).send(`create report with name ${JSON.stringify(report.name)}`);
  },
  update: (req, res) => {
    const report = req.body;
    const reportId = req.params.id;
    const updatedReport = reportModel.update(reportId, report);
    res.send(`update report by id ${req.params.id}`);
  },
  delete: (req, res) => {
    const reportId = req.params.id;
    const deletedReport = reportModel.delete(reportId);
    res.send(`delete report by id ${req.params.id}`);
  },
};
export default controller;
