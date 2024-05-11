
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Select, MenuItem } from '@material-ui/core';

const App = () => {
  // State for hotels and categories
  const [hotels, setHotels] = useState([]);
  const [categories, setCategories] = useState(['1 Star', '2 Star', '3 Star']);

  // State for form input fields
  const [hotelName, setHotelName] = useState('');
  const [hotelCountry, setHotelCountry] = useState('');
  const [hotelAddress, setHotelAddress] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // State for filtered hotels
  const [filteredHotels, setFilteredHotels] = useState([]);

  // Effect to fetch initial data and set filtered hotels
  useEffect(() => {
    // Fetch hotels from local storage
    const savedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    setHotels(savedHotels);
    setFilteredHotels(savedHotels);
  }, []);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const newHotel = {
      name: hotelName,
      country: hotelCountry,
      address: hotelAddress,
      category: selectedCategory,
    };
    const updatedHotels = [...hotels, newHotel];
    setHotels(updatedHotels);
    setFilteredHotels(updatedHotels);
    localStorage.setItem('hotels', JSON.stringify(updatedHotels));
    // Reset form fields
    setHotelName('');
    setHotelCountry('');
    setHotelAddress('');
    setSelectedCategory('');
  };

  // Function to handle category filter
  const handleCategoryFilter = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredHotels(hotels);
    } else {
      const filtered = hotels.filter((hotel) => hotel.category === category);
      setFilteredHotels(filtered);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Hotels Ranking
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Hotel Name"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Country"
          value={hotelCountry}
          onChange={(e) => setHotelCountry(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Address"
          value={hotelAddress}
          onChange={(e) => setHotelAddress(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Select
          value={selectedCategory}
          onChange={handleCategoryFilter}
          displayEmpty
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="" disabled>
            Select Category
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
          <MenuItem value="All">All</MenuItem>
        </Select>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Hotel
        </Button>
      </form>
      <Typography variant="h5" gutterBottom>
        List of Hotels
      </Typography>
      <ul>
        {filteredHotels.map((hotel, index) => (
          <li key={index}>
            <Typography variant="body1">
              {hotel.name} - {hotel.country} - {hotel.address} - {hotel.category}
            </Typography>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default App;

