const hallService = require('../services/hall');

const createHall = async (req, res) => {
    const newHall = await hallService.createHall(req.body.number, req.body.rows, req.body.columns);
    res.json(newHall);
};

const getHalls = async (req, res) => {
    const halls = await hallService.getHalls();
    res.json(halls);
};

const deleteHall = async (req, res) => {
    const halls = await hallService.deleteHall(req.params.id);
    res.json(halls);
};

module.exports = {
    createHall, getHalls, deleteHall
};