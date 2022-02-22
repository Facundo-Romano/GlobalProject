import {
    GET_COUNTRIES,
    FILTER_ALPHABETICALLY,
    FILTER_UNALPHABETICALLY,
    FILTER_DECREASING_POPULATION,
    FILTER_INCREASING_POPULATION,
    FILTER_BY_CONTINENT,
    SEARCH,
    DETAIL,
    GET_ACTIVITIES
} from './types.js';



const getCountries = (data) => {
    return {
        type: GET_COUNTRIES,
        payload: data
    }
};

const filterAlphabetically = () => {
    return {
        type: FILTER_ALPHABETICALLY
    }
};

const filterUnalphabetically = () => {
    return {
        type: FILTER_UNALPHABETICALLY
    }
};

const filterDecreasingPopulation = () => {
    return {
        type: FILTER_DECREASING_POPULATION
    }
};

const filterIncreasingPopulation = () => {
    return {
        type: FILTER_INCREASING_POPULATION
    }
};

const filterByContinent = (data) => {
    return {
        type: FILTER_BY_CONTINENT,
        payload: data
    }
};

const searchCountries = (data) => {
    return {
        type: SEARCH,
        payload: data
    }
};

const setDetail = (data) => {
    return {
        type: DETAIL,
        payload: data
    }
}

const getActivities = (data) => {
    return {
        type: GET_ACTIVITIES,
        payload: data
    }
}

export {
    getCountries,
    filterAlphabetically,
    filterUnalphabetically,
    filterDecreasingPopulation,
    filterIncreasingPopulation,
    filterByContinent,
    searchCountries,
    setDetail,
    getActivities
};