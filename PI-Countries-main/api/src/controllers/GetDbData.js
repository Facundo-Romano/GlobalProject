const { Country, Activity } = require('../db.js');



const getDbData = async () => {
    const dbData = await Country.findAll({
        include: [Activity]
    });
    let dataValues = [];
    for (let i=0; i < dbData.length; i++) {
        dataValues.push(dbData[i].dataValues)
    };
    return dataValues
};



module.exports = {
    getDbData,
};