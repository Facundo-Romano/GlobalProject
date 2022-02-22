import React from 'react';
import styles from  '../styles/landingPage.module.css';
import { NavLink } from 'react-router-dom';
import Earth from '../media/Earth.mp4';
import arrow from '../media/arrow.png';
import logo from '../media/globe-logo.png';



const LandingPage = () => {
    return (
        <div className={styles.landing}>
            <div className={styles.videoContainer}>
                <video loop autoPlay muted className={styles.video}>
                    <source
                        src={Earth}
                        type="video/mp4"
                    />
                </video>
            </div>
            <div className={styles.buttonContainer}>
                <div className={styles.responsiveText}>
                    <h1>Welcome to Global <img src={logo} alt='' className={styles.logo}/> </h1>
                    <p>This is a responsive single page aplication developed using 
                        Nodejs, React, Sequelize, Express and Redux. 
                        It is designed with only css, as an individual project.
                    </p>
                </div>
                <div className={styles.divNavlink}>
                    <NavLink to='/home' className={styles.navlink} data-testid='buttonTest'>
                        HOME
                    </NavLink>
                    <img src={arrow} alt='' className={styles.icon}/>
                </div>
            </div>
            <div className={styles.text}>
                    <h1>Welcome to Global <img src={logo} alt='' className={styles.logo}/> </h1>
                    <p>This is a responsive single page aplication developed using 
                        Nodejs, React, Sequelize, Express and Redux. 
                        It is designed with only css, as an individual project.
                    </p>
            </div>
        </div>
    )
};



export default LandingPage;