const axios = require('axios');



const getApiData = async () => {
    const apiData = await axios.get('https://restcountries.com/v3/all');
    const filteredApiData = apiData.data.map(item => {
        return {
            id: item.cca3,
            name: item.name.common[0] === 'Å' ? 'Aland Islands' : item.name.common,
            img: item.flags[0],
            continent: item.continents[0],
            capital: item.capital ? item.capital[0] : 'unknown',
            subregion: item.subregion ? item.subregion : 'unknown',
            area: item.area,
            population: item.population
        };
    });
    filteredApiData.sort((x,y) => { return x.name < y.name ? -1 : 1 });
    return filteredApiData;
};



module.exports = {
    getApiData,
};