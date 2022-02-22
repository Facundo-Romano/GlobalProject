import React from 'react';
import styles from '../styles/navBar.module.css';
import { NavLink } from 'react-router-dom';
import SearchBar from './searchBar';
import { useState, useEffect, useRef } from 'react';
import logo from '../media/globe-logo.png';
import arrow from '../media/arrow-white.png';

const NavBar = () => {
    let url = window.location.href;
    const [isHome, setIsHome] = useState(false);
    const linksRef = useRef(null);
    const link1 = useRef(null);
    const link2 = useRef(null);
    const link3 = useRef(null);
    const navbar = useRef(null);
    const arrowRef = useRef(null);

    useEffect(() => {
        if (url === 'http://localhost:3000/home') {
            setIsHome(true)
        }
    },[url]);

    let toggleMenu = () => {
        if (linksRef.current.style.maxHeight === '0px') {
            arrowRef.current.style.transform = 'rotate(90deg)'
            navbar.current.style.borderRadius = '0px 32px 0px 32px';
            linksRef.current.style.maxHeight = '270px';
            link1.current.style.visibility = 'visible';
            link1.current.style.opacity = '1';
            link2.current.style.visibility = 'visible';
            link2.current.style.opacity = '1';
            link3.current.style.visibility = 'visible';
            link3.current.style.opacity = '1';
        } else {
            arrowRef.current.style.transform = 'rotate(0deg)'
            navbar.current.style.borderRadius = '0px 0px 32px 32px';
            linksRef.current.style.maxHeight = '0px'
            link1.current.style.visibility = 'hidden';
            link1.current.style.opacity = '0';
            link2.current.style.visibility = 'hidden';
            link2.current.style.opacity = '0';
            link3.current.style.visibility = 'hidden';
            link3.current.style.opacity = '0';
        }
    };

    return (
        <div ref={navbar} className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.insideContainer}>
                    <img src={logo} alt='img not aviable' className={styles.logo}/>
                    <NavLink to='/home' className={styles.home}>Global</NavLink>
                </div>
                <div className={styles.searchBar}>
                    <SearchBar isHome={isHome}/>
                </div>
            </div>
            <div ref={linksRef} className={styles.links}>
                <NavLink to='/home' className={styles.link} ref={link1} >Countries</NavLink>
                <NavLink to='/home/activities' className={styles.link} ref={link2}>Activities</NavLink>
                <NavLink to='/home/createActivity' className={styles.link} ref={link3}>New Activity</NavLink>
            </div>
            <img src={arrow} alt='->' className={styles.arrow} onClick={() => toggleMenu()} ref={arrowRef}/>
        </div>
    )
};



export default NavBar;