import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";
import { fetchCountries } from "../api/fetchCountries";

function HotelForm({ onSave, initialHotelData = {} }) {
  const categories = useSelector((state) => state.categories.categories);
  const [hotelData, setHotelData] = useState({
    id: initialHotelData.id || "",
    name: initialHotelData.name || "",
    country: initialHotelData.country || "",
    address: initialHotelData.address || "",
    category: initialHotelData.category || "",
  });
  const [countries, setCountries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(hotelData.category);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (countries.length > 0) {
      setOpen(true);
    }
  };

  useEffect(() => {
    async function loadCountries() {
      try {
        const fetchedCountries = await fetchCountries();
        setCountries(fetchedCountries);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    }
    loadCountries();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedHotelData = {
      ...hotelData,
      id: initialHotelData.id,
      category: selectedCategory,
    };
    onSave(updatedHotelData);
  };

  useEffect(() => {
    console.log("Initial hotel data:", initialHotelData);
  }, [initialHotelData]);
  const buttonText = initialHotelData.id ? "Save Changes" : "Add Hotel";

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Hotel Name"
            value={hotelData.name}
            onChange={handleInputChange}
            name="name"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              open={open}
              onOpen={handleOpen}
              onClose={() => setOpen(false)}
              value={hotelData.country}
              onChange={handleInputChange}
              name="country"
            >
              {countries.map((country, index) => (
                <MenuItem key={index} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Address"
            value={hotelData.address}
            onChange={handleInputChange}
            name="address"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} textAlign="right">
          <Button type="submit" color="primary" variant="contained">
            {buttonText}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default HotelForm;
