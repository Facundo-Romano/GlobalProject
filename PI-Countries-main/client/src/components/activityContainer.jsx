import styles from '../styles/activityContainer.module.css';
import Activity from './activity';
import PaginateActivity from './paginateActivity';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getActivities, searchCountries, filterByContinent } from '../redux/actions';
import NavBar from './navBar';




const ActivityContainer = ({ getActivities, activities, searchCountries, filterByContinent }) => {
    const [loading, setLoading] = useState(false);
    const [activitiesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const getData = async () => {
                setLoading(true);
                let activities = await axios.get('http://localhost:3001/activities');
                getActivities(activities.data);
                searchCountries();
                filterByContinent('No continent');
                setLoading(false)
        };  
        getData();
    }, [activities.length, getActivities, searchCountries, filterByContinent]);

    const nextPage = number => setCurrentPage(number)
    const indexOfLastActivity = currentPage * activitiesPerPage;
    const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
    const currentActivities = activities.slice(indexOfFirstActivity, indexOfLastActivity);
    
    return (
        <div className={styles.container}>
            <NavBar/>
            <PaginateActivity activitiesPerPage={activitiesPerPage} totalActivities={activities.length} nextPage={nextPage}/>
            <Activity activities={currentActivities} loading={loading}/>
        </div>
    )
};



const mapStateToProps = state => {
    return { ...state } 
};



const mapDispatchToProps = dispatch => {
    return {
        getActivities: (data) => dispatch(getActivities(data)),
        searchCountries: (data) => dispatch(searchCountries(data)),
        filterByContinent: (data) => dispatch(filterByContinent(data))
        
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(ActivityContainer);