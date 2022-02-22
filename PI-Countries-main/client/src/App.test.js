import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingPage';



describe('LandingPage test', () => {
    it('should render', ()=> {
        render(
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<LandingPage/>}/>
                </Routes>
            </BrowserRouter>
        );
        expect(screen.getByTestId('buttonTest')).toBeInTheDocument()
    });
});