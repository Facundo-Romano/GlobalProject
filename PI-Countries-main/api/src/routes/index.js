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
        res.status(404).send('error creating a new activity')
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



/* {
    "name": "Hiking",
    "difficulty": 3,
    "duration": 2,
    "season": "winter",
    "img": "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGlraW5nfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    "countries": ["ARG", "QAT", "MEX"]
} */

/* {
    "name": "Surfing",
    "difficulty": 4,
    "duration": 1,
    "season": "summer",
    "img": "https://static01.nyt.com/images/2021/08/22/books/review/Bissell/Bissell-facebookJumbo.jpg",
    "countries": ["AFG", "AND"]
} */

/* {
    "name": "Shopping",
    "difficulty": 1,
    "duration": 5,
    "season": "spring",
    "img": "https://www.globalblue.com/business/images/article926851.ece/alternates/LANDSCAPE2_970/TFS_Article_2019_970x643.jpg",
    "countries": ["QAT", "ARG", "AFG", "MEX"]
} */

/* {
    "name": "Painting",
    "difficulty": 1,
    "duration": 3,
    "season": "winter",
    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKPgfn8s_B56kGmZdEKBep7la98dZ2xr6ScQ&usqp=CAU",
    "countries": ["QAT", "ARG", "AFG", "MEX", "ALA"]
} */

/* {
    "name": "Sight seeing",
    "difficulty": 2,
    "duration": "4 hs",
    "season": "summer",
    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0AWqnzdq4nWN20xA8ln4wLj4va4RWmGiERQ&usqp=CAU",
    "countries": ["ARG", "QAT", "MEX", "ALA", "AFG"]
} */
