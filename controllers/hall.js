const hallService = require('../services/hall');

const createHall = async (req, res) => {
    const newHall = await hallService.createHall(req.body.number, req.body.rows, req.body.columns);
    res.json(newHall);
};

module.exports = {
    createHall
  };