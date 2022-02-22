import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingPage';
import Home from './components/home';
import CountryDetail from './components/countryDetail';
import CreateActivity from './components/createActivity';
import ActivityContainer from './components/activityContainer';
import ActivityDetail from './components/activityDetail';




const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='app'>
          <Routes>
            <Route exact path='/' element={<LandingPage/>}/>
            <Route exact path='/home' element={<Home/>}/>
            <Route path='/home/:id' element={<CountryDetail/>}/>
            <Route exact path='/home/activities' element={<ActivityContainer/>}/>
            <Route exact path='/home/activities/:activityId' element={<ActivityDetail/>}/>
            <Route exact path='/home/createActivity' element={<CreateActivity/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};



export default App;