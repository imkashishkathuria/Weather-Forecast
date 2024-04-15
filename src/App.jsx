// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import Weather from './components/weather';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import City from './components/City';
// import Weather2 from './components/weather2';

function App() {
  return (
    <BrowserRouter>
   {/* <Weather /> */}
    <Routes>
     <Route path='/' element={<Weather />} />
    <Route path='/city/:cityName' element={<City />}/>
   </Routes>
    </BrowserRouter>
    
  );
}

export default App;
