import { useContext, useEffect, useState } from "react";
import NavigationBar from "../../NavigationBar";
import { AuthContext } from "../../common/AuthContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { itemsList } from "../../common/mock";
import {
  Button,
  Chip,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

function ProductDetail() {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      const item = itemsList.find((item) => String(item.id) === id);
      console.log("Entered", item);
      setProduct(item);
    }
  }, [id]);

  return authToken ? (
    <div>
      <NavigationBar isLogged={authToken !== null} />
      {product ? (
        <>
          <div style={{ marginBottom: 30, marginTop: 30, textAlign: "center" }}>
            <ToggleButtonGroup
              color="primary"
              value={product.category}
              exclusive
              disabled
              aria-label="Category"
            >
              <ToggleButton value="all">ALL</ToggleButton>
              <ToggleButton value="apparel">APPAREL</ToggleButton>
              <ToggleButton value="electronics">ELECTRONICS</ToggleButton>
              <ToggleButton value="personal-care">PERSONAL CARE</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div
            style={{
              width: "768px",
              padding: "10px 20px",
              margin: "50px auto",
              height: "100%",
              display: "flex",
              gap: 2,
            }}
          >
            <div
              style={{
                padding: "10px 20px",
              }}
            >
              <img
                src={product.imageUrl}
                alt={`${product.name}`}
                width={250}
                height={250}
              />
            </div>
            <div
              style={{
                padding: "10px 20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography gutterBottom variant="h5" component="p">
                  {product.name}
                </Typography>
                <Chip
                  label={`Available Quantity: ${product.availableItems}`}
                  color="primary"
                />
              </div>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                sx={{ mb: 2 }}
              >
                Category: {product.category}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                component="p"
                sx={{ fontStyle: "italic" }}
              >
                {product.description}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: "red", my: 2 }}
              >
                ₹{product.price}
              </Typography>
              <TextField
                label="Enter Quantity"
                onChange={(e) => setQuantity(e.target.value)}
                required
                variant="outlined"
                type="number"
                sx={{ my: 2, width: "75%" }}
                value={quantity}
              />
              <Button
                variant="contained"
                color="primary"
                type="button"
                sx={{ mt: 2 }}
                onClick={() =>
                  navigate("/order", {
                    state: { ...product, quantity: quantity },
                  })
                }
              >
                Place Order
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default ProductDetail;
