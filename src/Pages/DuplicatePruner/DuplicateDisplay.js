import React, { useState } from "react";
import {
  Typography,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  makeStyles,
  Box,
  Link,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const BoldText = ({ children }) => (
  <Box fontWeight="bold" display="inline">
    {children}
  </Box>
);

const Choice = ({ dups, selectedTrack, setSelectedTrack }) => {
  const classes = useStyles();
  return (
    <ExpansionPanel
      TransitionProps={{ mountOnEnter: true, unmountOnExit: true }}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography component="div">
          <BoldText> {dups[0].name + " "}</BoldText>
          by
          <BoldText> {" " + dups[0].artists[0].name + " "}</BoldText>
          was found
          <BoldText>{" " + dups.length + " "}</BoldText>
          times
          {/* {`${dups[0].name} by ${dups[0].artists[0].name} was found ${dups.length} times.`} */}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography>
              Select which album's version you want to keep.
            </Typography>
          </Grid>

          <Grid item>
            <RadioGroup
              value={selectedTrack}
              onChange={(e) => {
                setSelectedTrack(parseInt(e.target.value));
              }}
            >
              <FormControlLabel
                value={-1}
                control={<Radio />}
                label="Keep All"
              />
              {dups.map((track, i) => (
                <FormControlLabel
                  value={i}
                  key={i}
                  control={<Radio />}
                  label={<AlbumLabel album={track.album} />}
                />
              ))}
            </RadioGroup>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const AlbumLabel = ({ album }) => {
  const classes = useStyles();
  return (
    <div className={classes.albumLabel}>
      <Link
        color="secondary"
        href={album.external_urls.spotify}
        target="_blank"
      >
        {album.name}
      </Link>
      {/* we use the last image, as it is the smallest */}
      <img
        src={album.images[album.images.length - 1].url}
        style={{ width: "64px" }}
      />
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    maxHeight: 500,
    overflow: "auto",
  },
  albumLabel: {
    display: "flex",
    alignItems: "center",
    "& a": {
      fontWeight: "bold",
      marginRight: "16px",
    },
    "& img": {
      marginBottom: "8px",
    },
  },
});

export const DuplicateDisplay = ({ duplicates, proceed }) => {
  const [selected, setSelected] = useState(duplicates.map((tracks) => 0));
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} container justify="center">
        {duplicates.length === 0 ? (
          <Typography>
            We didn't find any duplicates. You're all set.
          </Typography>
        ) : (
          <>
            <Typography align="center">
              We found {duplicates.length} duplicate(s).
            </Typography>
            <Typography>
              If there are duplicates that you don't want to remove, just click
              on them and select 'Keep All'.
            </Typography>
          </>
        )}
      </Grid>
      <Paper className={classes.root}>
        {duplicates.map((dups, i) => (
          <Choice
            dups={dups}
            selectedTrack={selected[i]}
            key={i}
            setSelectedTrack={(val) =>
              // replaces the i-th entry of selected with the new val
              setSelected((prev) => {
                let next = [...prev];
                next[i] = val;
                return next;
              })
            }
          />
        ))}
      </Paper>
      <Grid item xs={12} container justify="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => proceed(selected)}
        >
          Remove Duplicates
        </Button>
      </Grid>
    </>
  );
};
