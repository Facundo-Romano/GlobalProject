import styles from '../styles/countryDetail.module.css';
import NavBar from './navBar';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { setDetail } from '../redux/actions';
import { NavLink } from 'react-router-dom';


const CountryDetail = ({ setDetail, detail }) => {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        let getCountry = async () => {
            let info = await axios.get(`http://localhost:3001/countries/${id}`);
            setDetail(info.data)
            setLoading(false)
        };
        getCountry();
    }, [id, setDetail])

    if(loading){
        return <h2>Loading...</h2>
    };

    return (
        <div className={styles.detail}>
            <NavBar/>
            <div className={styles.container}>
                <div className={styles.insideContainer}>
                    <img src={detail[0].img} alt='No img' className={styles.img}/>
                    <div className={styles.info}>
                        <h1 className={styles.name}>{detail[0].name}</h1>
                        <div className={styles.data}> 
                            <p className={styles.text}>ID: {detail[0].id}</p>
                            <p className={styles.text}>Continent: {detail[0].continent}</p>
                            <p className={styles.text}>Capital: {detail[0].capital}</p>
                            <p className={styles.text}>Subregion: {detail[0].subregion}</p>
                            <p className={styles.text}>Area: {detail[0].area} km2</p>
                            <p className={styles.text}>Population: {detail[0].population}</p>
                        </div>
                        <div className={styles.responsiveLinks}>
                            <h1 className={styles.responsiveH1}>Activities: </h1>
                            <div className={styles.responsiveActivities}>
                                {detail[0].Activities.map(item => (
                                    <NavLink to={`/home/activities/${item.id}`} className={styles.responsiveA} key={item.id}>{item.name}</NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.links}>
                    <h1 className={styles.h1}>Activities: </h1>
                    <div className={styles.activities}>
                        {detail[0].Activities.map(item => (
                            <NavLink to={`/home/activities/${item.id}`} className={styles.a} key={item.id}>{item.name}</NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};



const mapStateToProps = state => {
    return { ...state } 
};



const mapDispatchToProps = dispatch => {
    return {
        setDetail: (data) => dispatch(setDetail(data))
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(CountryDetail);