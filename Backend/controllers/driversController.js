import driversModel from "../models/driversModel.js";

const controller = {
  getAll: (req, res) => {
    const drivers = driversModel.findAll();
    res.send(drivers);
  },
  getById: (req, res) => {
    const driver = driversModel.findById(req.params.id);
    res.send(driver);
  },
  create: (req, res) => {
    const driver = req.body;
    const newDriver = driversModel.create(driver);
    res.status(201).send(`create driver with name ${JSON.stringify(driver.name)}`);
  },
  update: (req, res) => {
    const driver = req.body;
    const driverId = req.params.id;
    const updatedDriver = driversModel.update(driverId, driver);
    res.send(`update driver by id ${req.params.id}`);
  },
  delete: (req, res) => {
    const driverId = req.params.id;
    const deletedDriver = driversModel.delete(driverId);
    res.send(`delete driver by id ${req.params.id}`);
  },
};
export default controller;
