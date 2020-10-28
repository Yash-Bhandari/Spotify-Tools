import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import MenuDrawer from "./MenuDrawer";
import LoginButton from "../LoginButton";
import logo from "./spotify_logo.png";

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
  spotifyLogo: {
    width: "180px",
  },
});

export default (props) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <MenuDrawer />
        <img className={classes.spotifyLogo} src={logo} alt="Logo" />
        <Typography className={classes.title} variant="h4">
          {" Tools"}
        </Typography>
        {props.children}
      </Toolbar>
    </AppBar>
  );
};
