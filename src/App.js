import React, { useState, useEffect } from "react";
import { Header } from "./Components/Layout";
import { LoginButton } from "./Components/LoginButton";
import { Overview } from "./Components/Overview";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ServerLiason, handleRedirect } from "./utils";
import { Container, ThemeProvider } from "@material-ui/core";
import { Progress } from "./Components/Progress";
import { DuplicatePruner, DiscoverExtender, PlaylistGenerator } from "./Pages";
import { theme } from "./theme";

const App = (props) => {
  const [accessToken, updateAccessToken] = useState("");
  const [liason, setLiason] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [finishedFetching, setFinishedFetching] = useState(false);

  const setAccessToken = async (newAccessToken) => {
    updateAccessToken(newAccessToken);
    const sl = new ServerLiason(newAccessToken);
    setLiason(sl);
    //sl.fetchTracks(setTracks).then(done => { setFinishedFetching(done) }); // fetch tracks is async that returns true on completion
  };
  let authorized = Boolean(accessToken);
  useEffect(() => handleRedirect(authorized, setAccessToken), []);

  const loginButton = <LoginButton authorized={authorized} forNav={false} />;
  const navLoginButton = <LoginButton authorized={authorized} forNav={true} />;
  const progress = <Progress numTracks={tracks.length} />;
  const subProps = {
    liason,
    loginButton,
    progress,
    authorized,
    tracks,
    setTracks,
    finishedFetching,
  };
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header>{navLoginButton}</Header>
        <Container>
          <Switch>
            <Route path="/dup-prune">
              <DuplicatePruner {...subProps} />
            </Route>
            <Route path="/extend">
              <DiscoverExtender {...subProps} />
            </Route>
            <Route path="/">
              <Overview />
            </Route>
          </Switch>
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default App;
