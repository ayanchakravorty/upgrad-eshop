import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

function ProductCard(props) {
  const navigate = useNavigate();
  const { productData } = props;
  return (
    <Grid item xs={4}>
      <Card>
        <CardMedia
          sx={{ height: 150 }}
          image={productData.imageUrl}
          title={productData.name}
        />
        <CardContent sx={{ height: 150 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {productData.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              ₹{productData.price}
            </Typography>
          </div>
          <Typography variant="body2" color="text.secondary">
            {productData.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            alignSelf: "stretch",
            display: "flex",
            justifyContent: "space-between",
            margin: "0 10px",
          }}
        >
          <div>
            <Button
              size="small"
              variant="contained"
              onClick={() => navigate(`/products/${productData.id}`)}
            >
              Buy
            </Button>
          </div>
          <div>
            <IconButton>
              <DeleteIcon />
            </IconButton>
            <IconButton>
              <EditIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ProductCard;
