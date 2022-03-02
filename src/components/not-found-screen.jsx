import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../const';

const NotFoundScreen = () => {
  return (
    <section className='not-found'>
      <h1 className='not-found__title'>404. Not found</h1>
      <Link className='not-found__link' to={AppRoute.MAIN}>
        Go to the main page
      </Link>
    </section>
  );
};

export default NotFoundScreen;
