import styles from '../styles/activity.module.css';
import { NavLink } from 'react-router-dom';


const Activity = ({ loading, activities }) => {
    if(loading){
        return <h2>Loading...</h2>
    };

    return (
        <div className={styles.card}>
            {activities.map(activity => (
                <div className={styles.navlink} key={activity.id}>
                    <NavLink to={`/home/activities/${activity.id}`} key={activity.id} className={styles.text}>
                        <img src={activity.img} alt='no img' className={styles.img}/>
                        <h1 className={styles.name}>{activity.name}</h1>
                    </NavLink>
                </div>
            ))}
        </div>
    ) 
};



export default Activity;