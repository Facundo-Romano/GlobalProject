const { Router } = require('express');
const { getApiData } = require('../controllers/getApiData');
const { getDbData } = require('../controllers/getDbData');
const { getActivityData } = require('../controllers/getActivityData');
const { Country, Activity } = require('../db.js');
const router = Router();



router.get('/countries', async (req, res) => {
    if (req.query.name) {
        let dbData = await getDbData();
        const country = dbData.filter(item => item.name.toLowerCase().includes(req.query.name.toLowerCase()));
        country.length ? res.status(200).send(country) : res.status(400).send(`Country doesn't exist`);
        return
    };
    let apiData = await getApiData();
    for (let i=0; i < apiData.length; i++) {
        await Country.findOrCreate({
            where: {
                id: apiData[i].id,
                name: apiData[i].name,
                img: apiData[i].img,
                continent: apiData[i].continent,
                capital: apiData[i].capital,
                subregion: apiData[i].subregion,
                area: apiData[i].area,
                population: apiData[i].population
            }
        })
    };
    res.status(200).send(apiData);
});



router.get('/countries/:countryId', async (req, res) => {
    let { countryId } = req.params;
    if (typeof countryId !== 'string') {
        res.status(400).send(`Country id doesn't exist`)
        return
    }
    let data = await getDbData();
    const country = data.filter(item => item.id.toLowerCase() == countryId.toLowerCase());
    country.length ? res.send(country) : res.status(400).send(`Country id doesn't exist`);
});



router.post('/activity', async (req, res) => {
    try {
        let { name, difficulty, duration, season, countries, img } = req.body;
        let newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
            img
        });
        for (let i=0; i < countries.length; i++) {
            await newActivity.addCountry(countries[i]);
        }
        res.status(200).send('Activity created succesfully');
    } catch (error) {
        console.log(error);
        res.status(400).send('error creating a new activity')
    }
});



router.get('/activities', async (req, res) => {
    let activitiesData = await getActivityData();
    res.status(200).send(activitiesData);
});



router.get('/activities/:activityId', async (req, res) => {
    let { activityId } = req.params;
    let data = await getActivityData();
    const activity = data.filter(item => item.id == activityId);
    activity.length ? res.send(activity) : res.status(400).send(`Activity id doesn't exist`);
});



module.exports = router;