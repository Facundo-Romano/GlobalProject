import styles from '../styles/country.module.css';
import { NavLink } from 'react-router-dom';


const Country = ({ loading, countries }) => {
    if(loading){
        return <h2>Loading...</h2>
    };

    return (
        <div className={styles.card}>
            {countries.map(country => (
                <NavLink to={`/home/${country.id}`} key={country.id} className={styles.navlink}>
                    <h1 className={styles.name}>{country.name}</h1>
                    <img src={country.img} alt='no img' className={styles.img}/>
                    <p className={styles.data}>{country.continent}</p>
                </NavLink>
            ))}
        </div>
    ) 
};



export default Country;