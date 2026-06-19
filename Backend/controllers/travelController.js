import travelModel from "../models/travelModel.js";

const controller = {
  getAll: async (req, res) => {
    const travels = await travelModel.findAll();
    res.json(travels);
  },
  getById: async (req, res) => {
    const travel = await travelModel.findById(req.params.id);
    res.json(travel);
  },
  create: async (req, res) => {
    const travel = req.body;
    const newTravel = await travelModel.create(travel);
    res.status(201).json(newTravel);
  },
  update: async (req, res) => {
    const travel = req.body;
    const travelId = req.params.id;
    const updatedTravel = await travelModel.update(travelId, travel);
    res.json(updatedTravel);
  },
  delete: async (req, res) => {
    const travelId = req.params.id;
    await travelModel.delete(travelId);
    res.status(204).send();
  },
};
export default controller;
