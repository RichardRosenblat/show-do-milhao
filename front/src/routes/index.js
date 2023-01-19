import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Home from '../pages/Home';

import Signup from '../pages/Signup';

const Private = ({ Item }) => {
  const { signed } = useAuth();

  // eslint-disable-next-line react/jsx-no-undef
  return signed > 0 ? <Item /> : <Signin />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path='/home' element={<Private Item={Home} />} />

          <Route exact path='/signup' element={<Signup />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
