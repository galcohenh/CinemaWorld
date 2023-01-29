const Hall = require('../models/Hall');

const createHall = async (number, rows, columns) => {
    const hall = new Hall({
        number: number,
        rows: rows,
        columns: columns
    });

    return await hall.save();
};

const getHallById = async (id) => {
    return await Hall.findById(id);
};

const getHallByNumber = async (number) => {
    return await Hall.find({ number });
};

module.exports = {
    createHall,
    getHallById,
    getHallByNumber
}