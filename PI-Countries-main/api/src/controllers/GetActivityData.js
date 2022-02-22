const { Country, Activity } = require('../db.js');



const getActivityData = async () => {
    try {
        const dbData = await Activity.findAll({
            include: [Country]
        });
        let dataValues = [];
        for (let j=0; j < dbData.length; j++) {
            let tempArr = [];
            for (let i=0; i < dbData[j].dataValues.Countries.length; i++) {
                tempArr.push(dbData[j].dataValues.Countries[i].dataValues.id);
            };
            dbData[j].dataValues.countries = tempArr;
            delete dbData[j].dataValues.Countries;
            delete dbData[j].dataValues.createdAt;
            delete dbData[j].dataValues.updatedAt;
            dataValues.push(dbData[j].dataValues);
        };
        return dataValues
    } catch (error) {
        console.log(error)
    }
};



module.exports = {
    getActivityData,
};