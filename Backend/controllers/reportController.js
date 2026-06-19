import reportModel from "../models/reportModel.js";

const controller = {
  getAll: async (req, res) => {
    const reports =  await reportModel.findAll();
    res.json(reports);
  },
  getById: async (req, res) => {
    const report = await reportModel.find(req.params.id);
    res.json(report);
  },
  create: async (req, res) => {
    const { travelId, content } = req.body;
    const userId = req.user.id; 
    const newReport = await reportModel.create({ travelId, userId, content });
    res.status(201).json(newReport);
  
  },
  update: async (req, res) => {
    const { travelId, content } = req.body;
    const userId = req.user.id;
    const reportId = req.params.id;
    const updatedReport = await reportModel.update(reportId, { travelId, userId, content });
    res.json(updatedReport);
    
  },
  delete: async (req, res) => {
    const reportId = req.params.id;
    await reportModel.delete(reportId);
    res.json({ message: `Relatório ${reportId} excluído com sucesso` });
  },
};
export default controller;
