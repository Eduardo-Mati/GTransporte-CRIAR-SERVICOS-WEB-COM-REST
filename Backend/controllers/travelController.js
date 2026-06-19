import travelModel from "../models/travelModel.js";

const controller = {
  getAll: (req, res) => {
    const travels = travelModel.findAll();
    res.send(travels);
  },
  getById: (req, res) => {
    const travel = travelModel.find(req.params.id);
    res.send(travel);
  },
  create: (req, res) => {
    const travel = req.body;
    const newTravel = travelModel.create(travel);
    res.status(201).send(`create travel with name ${JSON.stringify(travel.name)}`);
  },
  update: (req, res) => {
    const travel = req.body;
    const travelId = req.params.id;
    const updatedTravel = travelModel.update(travelId, travel);
    res.send(`update travel by id ${req.params.id}`);
  },
  delete: (req, res) => {
    const travelId = req.params.id;
    const deletedTravel = travelModel.delete(travelId);
    res.send(`delete travel by id ${req.params.id}`);
  },
};
export default controller;
