import React, { useState } from 'react';
import { Header } from './Components/Layout';
import { LoginButton } from './Components/LoginButton';
import { Overview } from './Components/Overview';
import { DuplicatePruner } from './Components/DuplicatePruner';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PlaylistGenerator } from './Components/PlaylistGenerator';
import { ServerLiason } from './utils/ServerLiason';
import { Container } from '@material-ui/core';
import { Progress } from './Components/Progress';

const App = props => {
  const [accessToken, updateAccessToken] = useState('');
  const [liason, setLiason] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [finished, setFinished] = useState(false)

  const setAccessToken = async newAccessToken => {
    updateAccessToken(newAccessToken);
    const sl = new ServerLiason(newAccessToken);
    setLiason(sl);
    sl.fetchTracks(setTracks).then(done => {setFinished(done)}); // fetch tracks is async that returns true on completion
  }

  let authorized = Boolean(accessToken);
  const loginButton = <LoginButton setAccessToken={setAccessToken} authorized={authorized} />
  const progress = <Progress numTracks={tracks.length} />
  const subProps = {
    liason,
    loginButton,
    progress,
    authorized,
    tracks,
    finished
  }
  return (
    <Router>
      <Header >
        {loginButton}
      </Header>
      <Container>
        <Switch>
          <Route path='/dup-prune' >
            <DuplicatePruner {...subProps} />
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
