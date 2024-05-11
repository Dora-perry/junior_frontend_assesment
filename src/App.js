import React from "react";
import { Container, Typography } from "@mui/material";
import HotelList from "./components/HotelList.js";


const App = () => {

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          backgroundColor: "#f0f0f0",
          padding: 2,
          marginBottom: 8,
        }}
      >
        Hotel Ranking
      </Typography>
      <HotelList />
    </Container>
  );
};

export default App;
