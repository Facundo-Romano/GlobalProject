import styles from '../styles/country.module.css';
import { NavLink } from 'react-router-dom';
import Animation from '../media/loading.gif';

const Country = ({ loading, countries }) => {
    if(loading){
        return (
            <div className={styles.loading}>
                <img src={Animation} alt='' className={styles.loadingImg}/>
                <h1 className={styles.loadingH1}>Loading</h1>
            </div>
        )
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