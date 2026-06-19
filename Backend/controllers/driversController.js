import driversModel from "../models/driversModel.js";

const controller = {
  getAll: async (req, res) => {
    const drivers = await driversModel.findAll();
    res.json(drivers);
  },
  getById: async (req, res) => {
    const driver = await driversModel.findById(req.params.id);
    res.json(driver);
  },
  create: async (req, res) => {
    const driver = req.body;
    const newDriver = await driversModel.create(driver);
    res.status(201).json(newDriver);
  },
  update: async (req, res) => {
    const driver = req.body;
    const driverId = req.params.id;
    const updatedDriver = await driversModel.update(driverId, driver);
    res.json(updatedDriver);
  },
  delete: async (req, res) => {
    const driverId = req.params.id;
    await driversModel.delete(driverId);
    res.status(204).send();
  },
};
export default controller;
