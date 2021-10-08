import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';

// Pages
import home from './pages/home';
import wishlist from './pages/wishlist';
import cart from './pages/cart';

const App = () => {
  return (
    <>
      <Header />

      <Switch>
        <Route exact path={'/'} component={home} />
        <Route exact path={'/wishlist'} component={wishlist} />
        <Route exact path={'/cart'} component={cart} />
      </Switch>
    </>
  );
}

export default App;