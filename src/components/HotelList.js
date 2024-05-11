import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
} from "@material-ui/core";
import { deleteHotel } from "../features/hotelsSlice";
import { editHotel } from "../features/hotelsSlice";
import { addHotel } from "../features/hotelsSlice";
import HotelForm from "./HotelForm";
import HotelCard from "./HotelCard";
import Modal from "./Modal";

function HotelList() {
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotels.hotels || []);
  const categories = useSelector((state) => state.categories.categories || []);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentHotel, setCurrentHotel] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredHotels = selectedCategory
    ? hotels.filter((hotel) => hotel.category === selectedCategory)
    : hotels;
  console.log("hotel...", hotels);

  const handleEdit = (hotel) => {
    setCurrentHotel(hotel);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (hotelData) => {
    dispatch(editHotel(hotelData));
    setEditModalOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteHotel(id));
  };
  const handleOpenAddModal = () => {
    setCurrentHotel({
      id: "",
      name: "",
      country: "",
      address: "",
      category: "",
    });
    setAddModalOpen(true);
  };
  const handleSaveNewHotel = (hotelData) => {
    dispatch(addHotel(hotelData));
    setAddModalOpen(false);
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddModal}
            style={{ margin: "20px 0" }}
          >
            Add Hotel
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Filter by Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map((category, index) => (
                <MenuItem key={index} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <div style={{ padding: "20px" }}>
        <Grid container spacing={3}>
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <Grid item xs={12} sm={6} md={4} key={hotel.id}>
                <HotelCard
                  onEdit={() => handleEdit(hotel)}
                  hotel={hotel}
                  onDelete={() => handleDelete(hotel.id)}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography
                variant="h6"
                style={{ textAlign: "center", color: "red", marginTop: "50px" }}
              >
                No hotels available. Please add a new hotel.
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Hotel"
      >
        {currentHotel && (
          <HotelForm
            initialData={currentHotel}
            onSave={handleSaveEdit}
            initialHotelData={currentHotel}
          />
        )}
      </Modal>
      <Modal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Hotel"
      >
        <HotelForm onSave={handleSaveNewHotel} initialHotelData={{}} />
      </Modal>
    </>
  );
}

export default HotelList;
