import axios from 'axios';
import styles from '../styles/searchBar.module.css';
import { connect } from 'react-redux';
import { searchCountries } from '../redux/actions';
import { useState } from 'react';
import search from '../media/search.png'


const SearchBar = ({ isHome, searchCountries }) => {
    const [country, setCountry] = useState('');
    let handleChange = (e) => {
        e.preventDefault();
        setCountry(e.target.value)
    };
    let onSubmit = async (e) => {
        e.preventDefault();
        try {
            let getCountries = async () => {
                let searchedCountries = await axios.get(`http://localhost:3001/countries?name=${country}`);
                return searchedCountries.data
            };
            let countries = await getCountries()
            searchCountries(countries);
        } catch {
            searchCountries('Country does not exist')
        }
        setCountry('')
    };

    if (isHome) {
        return (
            <div className={styles.container}>
                <input id='searchBar' type='text' className={styles.input} 
                onChange={(e) => handleChange(e)} 
                value={country} 
                onKeyPress={e => e.key === 'Enter' && onSubmit(e)} 
                placeholder='Search country...'/>
                <button id='findButton' type='submit' className={styles.button} onClick={(e) => onSubmit(e)}>
                    <img src={search} alt='Find' className={styles.search}/>
                </button>
            </div>
        )
    } else {
        return (
            <div></div>
        )
        
    }
};



const mapDispatchToProps = dispatch => {
    return {
        searchCountries: (data) => dispatch(searchCountries(data))
    }
}



export default connect(null, mapDispatchToProps)(SearchBar);