import styles from '../styles/countriesContainer.module.css';
import Country from './country';
import Paginate from './paginate';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCountries, searchCountries } from '../redux/actions';
import Filters from './filters';
import icon from '../media/error.png';




const CountriesContainer = ({ getCountries, searchCountries, filteredCountries, countries, searched, filteredByContinent }) => {
    const [loading, setLoading] = useState(false);
    const [countriesPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const getData = async () => {
            if (countries.length <= 0) {
                setLoading(true);
                let country = await axios.get('http://localhost:3001/countries');
                getCountries(country.data);
                setLoading(false)
            };  
        }
        getData();
    }, [countries.length, getCountries]);

    if(typeof searched === 'string') {
        return (
            <div className={styles.noCountryContainer}>
                <img src={icon} alt='Img not available' className={styles.noCountryImg}/>
                <h1 className={styles.noCountryH1}>Country doesn't exist</h1>
                <button className={styles.noCountryButton} onClick={() => searchCountries()}>Back</button>
            </div>
        )
    }

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    let currentCountries = [];
    let totalCountries = 0;
    let pageNumbers = [];

    if (searched.length > 0) {
        currentCountries = searched.slice(indexOfFirstCountry, indexOfLastCountry);
        totalCountries = searched.length;
    } else if (filteredByContinent.length > 0) {
        currentCountries = filteredByContinent.slice(indexOfFirstCountry, indexOfLastCountry);
        totalCountries = filteredByContinent.length;
    } else {
        currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);
        totalCountries = filteredCountries.length;
    };

    for (let i=1; i <= Math.ceil(totalCountries/countriesPerPage); i++) {
        pageNumbers.push(i)
    };

    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <Filters setCurrentPage={setCurrentPage} />
                <Paginate pageNumbers={pageNumbers} loading={loading} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
            <div className={styles.countries}>
                <Country countries={currentCountries} loading={loading}/>
            </div>
        </div>
    )
};



const mapStateToProps = state => {
    return { ...state } 
};

const mapDispatchToProps = dispatch => {
    return {
        getCountries: (data) => dispatch(getCountries(data)),
        searchCountries: () => dispatch(searchCountries())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CountriesContainer)