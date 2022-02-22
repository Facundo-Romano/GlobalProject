import React from 'react';
import styles from '../styles/createActivity.module.css';
import NavBar from './navBar';
import { searchCountries, filterByContinent } from '../redux/actions';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getCountries } from '../redux/actions';
import axios from 'axios';
import PopUp from './popUp';
import Animation from '../media/loading.gif';



const CreateActivity = ({ searchCountries, filterByContinent, countries, getCountries }) => {
    const [newActivity, setNewActivity] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        img: '',
        countries: [],
    });
    const [loading, setLoading] = useState(false);
    const [popUp, setPopUp] = useState(false);
    const [nameError, setNameError] = useState('');
    const [durationError, setDurationError] = useState('');
    const [difficultyError, setDifficultyError] = useState('');
    const [seasonError, setSeasonError] = useState('');
    const [countriesError, setCountriesError] = useState('');
    const onlyAlphabetic = /^[a-zA-Z\s]*$/;

    useEffect(() => {
        searchCountries(); 
        filterByContinent('No continent');
        const updateCountries = async () => {
            setLoading(true);
            let country = await axios.get('http://localhost:3001/countries');
            getCountries(country.data);
            setLoading(false)
        };
        if (countries.length < 1) {
            updateCountries()
        }
    },[searchCountries, filterByContinent, getCountries, countries.length]);

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            if (newActivity.name.length <= 1) {
                setNameError('Name should contain more than 2 letters')
            } else if (!onlyAlphabetic.test(e.target.value)){
                setNameError('No simbols or numbers allowed');
            } else {
                setNameError('')
            }
        } else if (e.target.name === 'duration') {
            setDurationError('')
        } else if (e.target.name === 'difficulty') {
            setDifficultyError('')
        } else if (e.target.name === 'season') {
            setSeasonError('')
        }
        setNewActivity({ ...newActivity, [e.target.name]: e.target.value })
    };

    const handleSelect = (e) => {
        if (e.target.value === ''){
            return
        };
        setCountriesError('');
        let countriesArr = [...newActivity.countries, e.target.value];
        let selectobject = document.getElementById("countries");

        for (var i=1; i < selectobject.options.length; i++) {
            if (selectobject.options[i].value === e.target.value)
            selectobject.options[i].remove(i);
        };

        setNewActivity({ ...newActivity, countries: countriesArr });
    };

    const removeContinent = (e) => {
        let newCountries = newActivity.countries.filter(item => item !== e.target.value);
        setNewActivity({ ...newActivity, countries: newCountries });
        const length = e.target.value.length;
        let newOption = new Option(e.target.value.substring(0, length- 6), e.target.value);
        let selectobject = document.getElementById("countries");
        let option = null;
        for (let i=1; i < selectobject.options.length - 1; i++) {
            if (selectobject.options[i].value > e.target.value) {
                option = selectobject.options[i];
                i = selectobject.options.length - 1;
            }
        };
        selectobject.add(newOption, option);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let sendCountries = [];
        let length = newActivity.countries.length;
        const sendActivity = async () => {
            await axios.post('http://localhost:3001/activity', {
                name: newActivity.name,
                duration: newActivity.duration,
                difficulty: newActivity.difficulty,
                season: newActivity.season,
                img: newActivity.img,
                countries: sendCountries
            })
        };
        if (newActivity.name.length <= 2) {
            setNameError('Name should contain more than 2 letters')
        } else if (newActivity.duration.length < 1) {
            setDurationError('Please enter a duration for the activity')
        } else if (newActivity.difficulty.length < 1) {
            setDifficultyError('Please enter a difficulty for the activity')
        } else if (newActivity.season.length < 1) {
            setSeasonError('Please enter a season for the activity')
        } else if (length < 1) {
            setCountriesError('Please select a country for the activity')
        } else {
            for (let i=0; i < length; i++) {
                sendCountries.push(newActivity.countries[i].substring(newActivity.countries[i].length - 4, newActivity.countries[i].length - 1))
                console.log(sendCountries)
            };
            sendActivity();
            setNewActivity({
                name: '',
                difficulty: '',
                duration: '',
                season: '',
                img: '',
                countries: [],
            });
            setPopUp(true)
        }
    };

    if (loading) {
        return (
            <div className={styles.activity}>
                <NavBar/>
                <div className={styles.loading}>
                    <img src={Animation} alt='' className={styles.loadingImg}/>
                    <h1 className={styles.loadingH1}>Loading</h1>
                </div>
            </div>
        )
    };

    return (
        <div className={styles.activity}>
            <NavBar/>
            {popUp ? <PopUp popUp={popUp} setPopUp={setPopUp} /> :
            <div className={styles.bigContainer}>
                <div className={styles.navlink}> 
                    <NavLink to='/home' className={styles.linkButton}>Back</NavLink>
                </div>
                <form id='formContainer' onSubmit={(e) => handleSubmit(e)} className={styles.formContainer}>
                        <h1 className={styles.h1}>New Touristic Activity</h1>
                        <div className={styles.form} name='nameForm'>
                            <label className={styles.label} htmlFor='name'>Name:</label>
                            <input type='text' id='name' name='name' className={styles.input} value={newActivity.name} onChange={(e) => handleChange(e)}/>
                        </div>
                        <label htmlFor='nameForm' className={styles.error}>{nameError}</label>
                        <div name='durationForm' className={styles.form}>
                            <label className={styles.label} htmlFor='duration'>Duration:</label>
                            <select id='duration' name='duration' className={styles.select} onChange={(e) => handleChange(e)}>
                                <option value=''>Duration</option>
                                <option value='1'>1 hs</option>
                                <option value='2'>2 hs</option>
                                <option value='3'>3 hs</option>
                                <option value='4'>4 hs</option>
                                <option value='5'>5 hs</option>
                            </select>
                        </div>
                        <label htmlFor='durationForm' className={styles.error}>{durationError}</label>
                        <div name='difficultyForm' className={styles.form}>
                            <label className={styles.label} htmlFor='difficulty'>Difficulty:</label>
                            <select id='difficulty' name='difficulty' className={styles.select} onChange={(e) => handleChange(e)}>
                                <option value=''>Difficulty...</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </select>
                        </div>
                        <label htmlFor='difficultyForm' className={styles.error}>{difficultyError}</label>
                        <div name='seasonForm' className={styles.form}>
                            <label className={styles.label} htmlFor='season'>Season:</label>
                            <select className={styles.select} id='season' name='season' onChange={(e) => handleChange(e)} >
                                <option value=''>Season...</option>
                                <option value='Summer'>Summer</option>
                                <option value='Fall'>Fall</option>
                                <option value='Winter'>Winter</option>
                                <option value='Spring'>Spring</option>
                            </select>
                        </div>
                        <label htmlFor='seasonForm' className={styles.error}>{seasonError}</label>
                        <div name='imgForm' className={styles.form}>
                            <label className={styles.label} htmlFor='img'>Image:</label>
                            <input type='text' id='img' name='img' className={styles.input} onChange={(e) => handleChange(e)}/>
                        </div>
                        <div name='countriesForm' id='selectForm' className={styles.form}>
                            <label className={styles.label} htmlFor='season'>Country:</label>
                            <select className={styles.select} name='countries' id='countries' onChange={(e) => handleSelect(e)}>
                                <option value=''>Countries...</option>
                                {countries.map((c) => (
                                    <option key={c.id} value={`${c.name} (${c.id})`}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                        <label htmlFor='countriesForm' className={styles.error}>{countriesError}</label>
                        <div className={styles.responsiveSelectedCountries}>
                            <h1 className={styles.responsiveH1Countries}>Selected countries:</h1>
                            {newActivity.countries.map(item => (
                                <div name={item} key={item} className={styles.responsiveCountries}>
                                        <div name={item} key={item} className={styles.responsiveName}>{item}</div>
                                        <button value={item} className={styles.responsiveButton} onClick={(e) => removeContinent(e)}>x</button> 
                                </div>
                            ))}
                        </div>
                        <button className={styles.addActivity} type='submit'>Add Activity</button>
                </form>
                <div className={styles.selectedCountries}>
                    <h1 className={styles.h1Countries}>Selected countries:</h1>
                    {newActivity.countries.map(item => (
                        <div name={item} key={item} className={styles.countries}>
                                <div name={item} key={item} className={styles.name}>{item}</div>
                                <button value={item} className={styles.button} onClick={(e) => removeContinent(e)}>x</button> 
                        </div>
                    ))}
                </div>
            </div>
            }
        </div>
    )
};



const mapStateToProps = state => {
    return { ...state } 
};



const mapDispatchToProps = dispatch => {
    return {
        searchCountries: (data) => dispatch(searchCountries(data)),
        filterByContinent: (data) => dispatch(filterByContinent(data)),
        getCountries: (data) => dispatch(getCountries(data))
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(CreateActivity);