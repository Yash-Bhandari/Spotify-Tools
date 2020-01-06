import React, { useState } from 'react';
import { Header } from './Components/Layout';
import { LoginButton } from './Components/LoginButton';
import { Overview } from './Components/Overview';
import { DuplicatePruner } from './Components/DuplicatePruner';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PlaylistGenerator } from './Components/PlaylistGenerator';
import { ServerLiason } from './utils/ServerLiason';
import { Container } from '@material-ui/core';

const App = props => {
  const [accessToken, updateAccessToken] = useState('');
  const [liason, setLiason] = useState(null);
  const [tracks, setTracks] = useState([]);

  const setAccessToken = async newAccessToken => {
    updateAccessToken(newAccessToken);
    const sl = new ServerLiason(newAccessToken);
    setLiason(sl);
    sl.fetchTracks(setTracks);
  }

  let authorized = Boolean(accessToken);
  const loginButton = <LoginButton setAccessToken={setAccessToken} authorized={authorized} />
  return (
    <Router>
      <Header >
        {loginButton}
      </Header>
      <Container>
        <Switch>
          <Route path='/dup-prune' >
            <DuplicatePruner liason={liason} authorized={authorized} loginButton={loginButton} />
          </Route>
          <Route path='/play-gen' >
            <PlaylistGenerator liason={liason} />
          </Route>
          <Route path='/'>
            <Overview />
          </Route>
        </Switch>
      </Container>

    </Router>
  )
}

export default App
