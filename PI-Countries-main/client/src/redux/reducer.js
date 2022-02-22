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



const initialState = {
    countries: [],
    filteredCountries: [],
    filteredByContinent: [],
    searched: [],
    detail: {},
    activities: []
};



const reducer = (state = initialState, action) => {
    let filteredData = [];
    let filteredContinentData = [];
    switch(action.type) {
        case GET_COUNTRIES:
            return { ...state, countries: action.payload, filteredCountries: action.payload };
        case FILTER_ALPHABETICALLY:
            filteredData = [...state.countries].sort((x,y) => { return x.name < y.name ? -1 : 1 });
            state.filteredByContinent.length ? 
            filteredContinentData = [...state.filteredByContinent].sort((x,y) => { return x.name < y.name ? -1 : 1 }) :
            filteredContinentData = []
            return { ...state, filteredCountries: filteredData, filteredByContinent: filteredContinentData }
        case FILTER_UNALPHABETICALLY:
            filteredData = [...state.countries].sort((x,y) => { return x.name < y.name ? 1 : -1 });
            state.filteredByContinent.length ? 
            filteredContinentData = [...state.filteredByContinent].sort((x,y) => { return x.name < y.name ? 1 : -1 }) :
            filteredContinentData = []
            return { ...state, filteredCountries: filteredData, filteredByContinent: filteredContinentData }
        case FILTER_DECREASING_POPULATION:
            filteredData = [...state.countries].sort((x,y) => { return x.population < y.population ? 1 : -1 });
            state.filteredByContinent.length ? 
            filteredContinentData = [...state.filteredByContinent].sort((x,y) => { return x.population < y.population ? 1 : -1 }) :
            filteredContinentData = []
            return { ...state, filteredCountries: filteredData, filteredByContinent: filteredContinentData }
        case FILTER_INCREASING_POPULATION:
            filteredData = [...state.countries].sort((x,y) => { return x.population < y.population ? -1 : 1 });
            state.filteredByContinent.length ? 
            filteredContinentData = [...state.filteredByContinent].sort((x,y) => { return x.population < y.population ? -1 : 1 }) :
            filteredContinentData = []
            return { ...state, filteredCountries: filteredData, filteredByContinent: filteredContinentData }
        case FILTER_BY_CONTINENT:
            if (action.payload === 'No continent'){
                return { ...state, filteredByContinent: [] }
            };
            filteredData = state.filteredCountries.filter(item => action.payload.includes(item.continent));
            return { ...state, filteredByContinent: filteredData }
        case SEARCH:
            if (action.payload) {
                return { ...state, searched: action.payload }
            };
            return { ...state, searched: [] }
        case DETAIL:
            return { ...state, detail: action.payload}
        case GET_ACTIVITIES:
            return { ...state, activities: action.payload }
        default: 
            return { ...state }
    };
};



export default reducer;