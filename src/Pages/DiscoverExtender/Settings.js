import React, { useState } from "react";
import {
  Grid,
  Checkbox,
  TextField,
  FormControlLabel,
  FormControl,
  Typography,
  makeStyles,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  text: {
    "padding-left": theme.spacing(4),
    "padding-right": theme.spacing(4),
    "margin-top": 0,
  },
  input: {
    "margin-top": theme.spacing(1),
  },
}));

export const Settings = ({ settings, setSettings }) => {
  const handleChange = (name) => (val) => {
    setSettings((prev) => {
      const next = { ...prev };
      next[name] = val;
      return next;
    });
  };

  const classes = useStyles();

  return (
    <Grid
      item
      container
      justify="space-around"
      spacing={2}
      className={classes.root}
    >
      <Grid item lg={12}>
        <Typography align="center" className={classes.text}>
          Choose the number and type of songs to include in your playlist. You
          can also choose the playlist's name (we won't overwrite any existing
          playlists with the same name).
        </Typography>
      </Grid>
      <TextField
        className={classes.input}
        InputLabelProps={{ shrink: true }}
        type="number"
        label="Playlist Size"
        value={settings.size}
        onChange={(e) => handleChange("size")(e.target.value)}
      />
      <TextField
        className={classes.input}
        InputLabelProps={{ shrink: true }}
        label={"Playlist Name"}
        value={settings.playlistName}
        onChange={(e) => handleChange("playlistName")(e.target.value)}
      />
      <FormControlLabel
        className={classes.input}
        control={
          <Checkbox
            checked={settings.explicit}
            onChange={(e) => handleChange("explicit")(e.target.checked)}
          />
        }
        label="Allow Explicit Songs"
      />
      <FormControlLabel
        className={classes.input}
        control={
          <Checkbox
            checked={settings.library}
            onChange={(e) => handleChange("library")(e.target.checked)}
          />
        }
        label="Allow Songs Already In Library"
      />

      {/*<FormControl className={classes.input} style={{minWidth: 240}}>
                <InputLabel id='seed-playlist'>Seed Playlist</InputLabel>
                <Select
                    value={settings.seedPlaylist}
                    onChange={e => handleChange('seedPlaylist')(e.target.value)}
                >
                    <MenuItem value={0}>Discover Weekly</MenuItem>
                </Select>
            </FormControl>*/}
    </Grid>
  );
};
