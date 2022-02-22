import styles from '../styles/filter.module.css';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react'; 
import {
    filterAlphabetically,
    filterUnalphabetically,
    filterDecreasingPopulation,
    filterIncreasingPopulation,
    filterByContinent
    } from '../redux/actions.js';


const Filter = ({ filterAlphabetically, filterUnalphabetically, filterDecreasingPopulation, filterIncreasingPopulation, setCurrentPage, filterByContinent }) => {
    const [continents, setContinents] = useState([]);

    useEffect(() => {
        filterByContinent(continents)
    }, [continents, filterByContinent])

    const onChange = (value) => {
         switch(value.target.value) {
            case 'A-Z': 
                filterAlphabetically(); 
                setCurrentPage(1); 
                return
            case 'Z-A': 
                filterUnalphabetically(); 
                setCurrentPage(1); 
                return
            case 'decreasing': 
                filterDecreasingPopulation(); 
                setCurrentPage(1); 
                return
            case 'increasing': 
                filterIncreasingPopulation(); 
                setCurrentPage(1); 
                return
            default:
                return
        }
    };

    const continentsOnChange = (e) => {
        if (continents.includes(e.target.value)) {
            return 
        } else if (e.target.value === 'allContinents'){
            setContinents([]);
            return
        };
        setCurrentPage(1);
        let newState = [...continents, e.target.value];
        setContinents(newState);
    };

    const removeContinent = (continent) => {
        let newState = continents.filter(item => item !== continent.target.value);
        setContinents(newState)
    }

    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <label htmlFor='filters' className={styles.label}>Sort countries: </label>
                <select name='filters' id='filters'  className={styles.select} onChange={onChange} defaultValue='A-Z'>
                    <optgroup label='Sort countries by name:'>
                        <option value='A-Z'>A-Z</option>
                        <option value='Z-A'>Z-A</option>
                    </optgroup>
                    <optgroup label='Sort countries by population:'>
                        <option value='decreasing'>decreasing</option>
                        <option value='increasing'>increasing</option>
                    </optgroup>
                </select>
            </div>
            <div className={styles.continents}>
                <div className={styles.continentsFilters}>
                    <label htmlFor='continents' className={styles.label}>Select continents: </label>
                    <select name='continents' id='continents' className={styles.select} onChange={(e) => continentsOnChange(e)} defaultValue='allContinents'>
                        <option value='allContinents'>All continents</option>
                        <option value='North America'>North America</option>
                        <option value='South America'>South America</option>
                        <option value='Europe'>Europe</option>
                        <option value='Asia'>Asia</option>
                        <option value='Africa'>Africa</option>
                        <option value='Australia'>Australia</option>
                        <option value='Antarctica'>Antarctica</option>
                    </select>
                </div>
                <div className={styles.selectedContinents}>
                    {continents.map(item => (
                        <div name={item} key={item} className={styles.mapped}>
                            <div name={item} key={item} className={styles.mappedName}>{item}</div>
                            <button value={item} onClick={(e) => removeContinent(e)} className={styles.mappedButton}>x</button> 
                        </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};



const mapDispatchToProps = dispatch => {
    return {
        filterAlphabetically: () => dispatch(filterAlphabetically()),
        filterUnalphabetically: () => dispatch(filterUnalphabetically()),
        filterDecreasingPopulation: () => dispatch(filterDecreasingPopulation()),
        filterIncreasingPopulation: () => dispatch(filterIncreasingPopulation()),
        filterByContinent: (data) => dispatch(filterByContinent(data)),
    };
}



export default connect(null, mapDispatchToProps)(Filter);