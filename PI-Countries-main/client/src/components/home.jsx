import styles from '../styles/home.module.css';
import CountriesContainer from './countriesContainer';
import NavBar from './navBar';




const Home = () => {
    return (
        <div className={styles.home}>
            <NavBar/>
            <CountriesContainer/>
        </div>
    )
};



export default Home;