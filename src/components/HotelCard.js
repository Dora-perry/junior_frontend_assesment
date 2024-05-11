import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

const HotelCard = ({ hotel, onEdit, onDelete }) => {
  return (
    <Card raised>
      <CardContent>
        <Typography variant="h5" component="h2">
         Name:  {hotel.name}
        </Typography>
        <Typography color="textSecondary">Country: {hotel.country}</Typography>
        <Typography variant="body2" component="p">
          Address: {hotel.address}
          <br />
          Category: {hotel.category}
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
