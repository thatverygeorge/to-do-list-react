import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MainScreen from './main-screen';
import NotFoundScreen from './not-found-screen';
import { AppRoute } from '../const';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={AppRoute.MAIN} element={<MainScreen />} />
        <Route path='*' element={<NotFoundScreen />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
