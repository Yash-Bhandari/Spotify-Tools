import React from "react";
import { Link, Typography, Button, Grid } from "@material-ui/core";

export const PlaylistDisplay = ({ playlist }) => (
  <Grid item container justify="center" spacing={2}>
    <Grid item align="center" xs={12}>
      <Typography>
        Your {playlist.size} song playlist{" "}
        <Link href={playlist.url} color="secondary">
          {playlist.name}
        </Link>{" "}
        is ready!
      </Typography>
    </Grid>
    <Grid item>
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.open(playlist.url, "_blank")}
      >
        Take Me
      </Button>
    </Grid>
  </Grid>
);
