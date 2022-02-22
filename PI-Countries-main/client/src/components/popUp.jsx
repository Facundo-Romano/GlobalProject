import { NavLink } from "react-router-dom";
import styles from '../styles/popUp.module.css';
import icon from '../media/success.png';


const PopUp = ({ popUp, setPopUp }) => {
    const handleClick = () => {
        setPopUp(false);
    };

    return popUp ? (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <img src={icon} alt='Success' className={styles.img}/>
                <h1 className={styles.h1}>Success</h1>
            </div>
            <NavLink onClick={handleClick} to='/home/activities' className={styles.navlink}>Back</NavLink>
        </div>
    ) : ''
};



export default PopUp;