import React from "react";
import { Container, Typography } from "@material-ui/core";
import HotelList from "./components/HotelList.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(8),
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" className={classes.title}>
        Hotel Ranking
      </Typography>
      <HotelList />
    </Container>
  );
};

export default App;
