import fleetsModel from "../models/fleetsModel.js";

const controller = {
  getAll: async (req, res) => {
    const fleets = await fleetsModel.findAll();
    res.json(fleets);
  },
  getById: async (req, res) => {
    const fleet = await fleetsModel.find(req.params.id);
    res.send(fleet);
  },
  create: async (req, res) => {
    const fleet = req.body;
    const newFleet = await fleetsModel.create(fleet);
    res.status(201).json(newFleet);
  },
  update: async (req, res) => {
    const fleet = req.body;
    const fleetId = req.params.id;
    const updatedFleet = await fleetsModel.update(fleetId, fleet);
    res.json(updatedFleet);
  },
  delete: async (req, res) => {
    const fleetId = req.params.id;
    const deletedFleet = await fleetsModel.delete(fleetId);
    res.status(200).end();
  },
};
export default controller;
