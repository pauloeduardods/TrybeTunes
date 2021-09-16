import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/TrybeTunes/" component={ Login } />
          <Route exact path="/TrybeTunes/search" component={ Search } />
          <Route path="/TrybeTunes/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route exact path="/TrybeTunes/favorites" component={ Favorites } />
          <Route exact path="/TrybeTunes/profile" component={ Profile } />
          <Route exact path="/TrybeTunes/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
