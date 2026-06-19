import fleetsModel from "../models/fleetsModel.js";

const controller = {
  getAll: (req, res) => {
    const fleets = fleetsModel.findAll();
    res.send(fleets);
  },
  getById: (req, res) => {
    const fleet = fleetsModel.find(req.params.id);
    res.send(fleet);
  },
  create: (req, res) => {
    const fleet = req.body;
    const newFleet = fleetsModel.create(fleet);
    res.status(201).send(`create fleet with name ${JSON.stringify(fleet.name)}`);
  },
  update: (req, res) => {
    const fleet = req.body;
    const fleetId = req.params.id;
    const updatedFleet = fleetsModel.update(fleetId, fleet);
    res.send(`update fleet by id ${req.params.id}`);
  },
  delete: (req, res) => {
    const fleetId = req.params.id;
    const deletedFleet = fleetsModel.delete(fleetId);
    res.send(`delete fleet by id ${req.params.id}`);
  },
};
export default controller;
