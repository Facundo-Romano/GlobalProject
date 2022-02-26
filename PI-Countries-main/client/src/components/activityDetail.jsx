import styles from '../styles/countryDetail.module.css';
import NavBar from './navBar';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { setDetail } from '../redux/actions';
import { NavLink } from 'react-router-dom';

const style = {
    'minHeight': '200px',
    'width': 'auto'
};

const ActivityDetail = ({ setDetail, detail, activities }) => {
    const [loading, setLoading] = useState(true);
    const { activityId } = useParams();
    useEffect(() => {
        let getCountry = async () => {
            try {
                let info = await axios.get(`http://localhost:3001/activities/${activityId}`);
                setDetail(info.data)
            } catch {}
            setLoading(false)
        };
        getCountry();
    }, [activityId, setDetail])

    if(loading){
        return <h2>Loading...</h2>
    };

    return (
        <div className={styles.detail}>
            <NavBar/>
            <div className={styles.container}>
                <div className={styles.insideContainer}>
                    <img src={detail[0].img} alt='No img' className={styles.img} style={style}/>
                    <div className={styles.info}>
                        <h1 className={styles.name}>{detail[0].name}</h1>
                        <div className={styles.data}> 
                            <p className={styles.text}>Difficulty :{detail[0].difficulty}</p>
                            <p className={styles.text}>Duration: {detail[0].duration}hs</p>
                            <p className={styles.text}>Season: {detail[0].season}</p>
                        </div>
                        <div className={styles.responsiveLinks}>
                            <h1 className={styles.responsiveH1}>Countries: </h1>
                            <div className={styles.responsiveActivities}>
                                {detail[0].countries.map(item => (
                                    <NavLink to={`/home/${item}`} className={styles.responsiveA} key={item}>{item}</NavLink>
                                ))}     
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.links}>
                    <h1 className={styles.h1}>Countries: </h1>
                    <div className={styles.activities}>
                        {detail[0].countries.map(item => (
                            <NavLink to={`/home/${item}`} className={styles.a} key={item}>{item}</NavLink>
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



export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetail);