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
  Box,
  TextField,
  ListItemIcon,
  IconButton,
  ListItemText,
} from "@mui/material";
import { deleteHotel } from "../store/features/hotelsSlice";
import { editHotel } from "../store/features/hotelsSlice";
import { addHotel } from "../store/features/hotelsSlice";
import { addCategory } from "../store/features/categoriesSlice";
import { removeCategory } from "../store/features/categoriesSlice";
import { updateCategory } from "../store/features/categoriesSlice";
import HotelForm from "./HotelForm";
import HotelCard from "./HotelCard";
import Modal from "./Modal";
import emptyData from "../assets/images/empty.png";
import { Snackbar, Alert } from "@mui/material";
import fitting from "../assets/images/undraw_Fitting.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function HotelList() {
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotels.hotels || []);
  const categories = useSelector((state) => state.categories.categories || []);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentHotel, setCurrentHotel] = useState(null);
  const [currentCategory, setCurrentCategory] = useState({ id: "", name: "" });
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const filteredHotels = selectedCategory
    ? hotels.filter((hotel) => hotel.category === selectedCategory)
    : hotels;

  const handleEdit = (hotel) => {
    setCurrentHotel(hotel);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (hotelData) => {
    dispatch(editHotel(hotelData));
    handleSnackbarOpen("Hotel updated successfully!");
    setEditModalOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteHotel(id));
    handleSnackbarOpen("Hotel deleted successfully!");
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

  const handleOpenCategoryModal = () => {
    setCurrentCategory({ name: "" });
    setCategoryModalOpen(true);
  };
  const handleSaveNewHotel = (hotelData) => {
    dispatch(addHotel(hotelData));
    handleSnackbarOpen("Hotel created successfully!");
    setAddModalOpen(false);
  };

  const handleAddCategory = (event) => {
    event.preventDefault();

    console.log("Current Category before update:", currentCategory);

    if (currentCategory.id) {
      dispatch(updateCategory(currentCategory));
      handleSnackbarOpen("Category updated successfully!");
    } else {
      dispatch(addCategory(currentCategory));
      handleSnackbarOpen("Category created successfully!");
    }
    setCurrentCategory({ id: "", name: "" });
  };

  const handleDeleteCategory = (category) => {
    dispatch(removeCategory(category));
    handleSnackbarOpen("Category deleted successfully!");
  };

  const handleEditCategory = (category) => {
    console.log(category, "this is it");
    setCurrentCategory(category);
    setCategoryModalOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      {hotels.length > 0 && (
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px 0",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenAddModal}
              size="large"
              sx={{ flexGrow: 1, mr: 1 }}
            >
              Add Hotel
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                flexGrow: 1,
                backgroundColor: "transparent",
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "common.white",
                },
              }}
              onClick={handleOpenCategoryModal}
            >
              Create Category
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="categ">Filter by Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Filter by Category"
                labelId="categ"
                id="categ"
              >
                <MenuItem value="">
                  <em>All</em>
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
      )}

      <div style={{ padding: "20px" }}>
        <Grid container spacing={3}>
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <Grid item xs={12} sm={6} md={4} key={hotel.id}>
                <HotelCard
                  hotel={hotel}
                  onEdit={() => handleEdit(hotel)}
                  onDelete={() => handleDelete(hotel.id)}
                />
              </Grid>
            ))
          ) : selectedCategory ? (
            <Grid item xs={12}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <img
                  src={emptyData}
                  alt="No data"
                  style={{ width: 200, marginBottom: 8 }}
                />
                <Typography
                  variant="h6"
                  style={{
                    textAlign: "center",
                    color: "gray",
                    marginTop: "50px",
                  }}
                >
                  No hotels found in the selected category.
                </Typography>
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <img
                src={fitting}
                alt="No data"
                style={{ width: 200, marginBottom: 8 }}
              />
              <Typography
                variant="h6"
                style={{
                  color: "gray",
                  marginTop: "10px",
                }}
              >
                No hotels available. Please add a new hotel.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenAddModal}
                style={{ margin: "20px 0" }}
                size="large"
              >
                Add Hotel
              </Button>
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
      <Modal
        open={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        title="Add Custom Category"
      >
        <Grid item xs={12} height={10} />
        <form onSubmit={handleAddCategory}>
          <Grid container spacing={2}>
            <TextField
              label="Name"
              value={currentCategory.name}
              onChange={handleInputChange}
              name="name"
              fullWidth
              required
            />
            <Grid
              item
              xs={12}
              md={12}
              textAlign={{ xs: "center", sm: "right" }}
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth={{ xs: true, sm: false, md: false, lg: false }}
                sx={{ width: { sm: "auto", md: "auto" } }}
                size="lg"
              >
                save
              </Button>
            </Grid>
          </Grid>
        </form>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.name}>
            <ListItemText>{category.name}</ListItemText>
            {!category.isDefault && (
              <>
                <ListItemIcon>
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      handleEditCategory(category);
                    }}
                    edge="end"
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemIcon>
                <ListItemIcon>
                  <IconButton
                    onClick={() => handleDeleteCategory(category)}
                    edge="end"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemIcon>
              </>
            )}
          </MenuItem>
        ))}
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default HotelList;
