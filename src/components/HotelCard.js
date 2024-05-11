import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

const HotelCard = ({ hotel, onEdit, onDelete }) => {
  return (
    <Card style={{ border: "1px solid #ccc", borderRadius: "10px" }}>
      <CardContent>
        <Typography >
          <span style={{ fontWeight: "bold" }}>Name:</span> {hotel.name}
        </Typography>
        <Typography>
          {" "}
          <span style={{ fontWeight: "bold" }}>Country:</span> {hotel.country}
        </Typography>
        <Typography>
          <span style={{ fontWeight: "bold" }}>Address:</span>
          {hotel.address}
        </Typography>
        <Typography>
          <span style={{ fontWeight: "bold" }}>Category:</span> {hotel.category}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "space-between" }}>
        <Button size="small" color="primary" onClick={() => onEdit(hotel)}>
          Edit
        </Button>
        <Button
          size="small"
          color="secondary"
          onClick={() => onDelete(hotel.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default HotelCard;
