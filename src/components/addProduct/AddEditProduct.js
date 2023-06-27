import { useContext, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import NavigationBar from "../../NavigationBar";
import { AuthContext } from "../../common/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

function AddEditProduct() {
  const { authToken, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = id !== undefined;
  const [name, setName] = useState("");
  const [category, setCategory] = useState();
  const [manufacturer, setManufacturer] = useState("");
  const [availableItems, setAvailableItems] = useState();
  const [price, setPrice] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const [nameError, setNameError] = useState(false);
  const [manufacturerError, setManufacturerError] = useState(false);
  const [availableItemsError, setAvailableItemsError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/categories", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(function (response) {
        setCategoryList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isEditMode) {
      setDataLoading(true);
      axios
        .get(`http://localhost:8080/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          const data = response.data;
          setName(data.name);
          const categoryName = data.category;
          console.log(categoryName);
          setCategory({ label: categoryName, value: categoryName });
          setManufacturer(data.manufacturer);
          setAvailableItems(data.availableItems);
          setPrice(data.price);
          setImageUrl(data.imageUrl);
          setProductDescription(data.description);
        })
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => setDataLoading(false));
    }
  }, [isEditMode, id, authToken]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setNameError(false);
    setManufacturerError(false);
    setAvailableItemsError(false);
    setPriceError(false);

    if (name === "") {
      setName(true);
    }
    if (manufacturer === "") {
      setManufacturer(true);
    }
    if (availableItems === "") {
      setAvailableItemsError(true);
    }
    if (price === "") {
      setPriceError(true);
    }

    if (name && manufacturer && category.value && availableItems && price) {
      if (isEditMode) {
        axios
          .put(
            `http://localhost:8080/api/products/${id}`,
            {
              name: name,
              category: category.value,
              manufacturer: manufacturer,
              availableItems: availableItems,
              price: price,
              imageUrl: imageUrl,
              description: productDescription,
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          )
          .then(function (response) {
            alert(`Product ${name} modified successfully!`);
            navigate("/products");
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .post(
            "http://localhost:8080/api/products",
            {
              name: name,
              category: category.value,
              manufacturer: manufacturer,
              availableItems: availableItems,
              price: price,
              imageUrl: imageUrl,
              description: productDescription,
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          )
          .then(function (response) {
            alert(`Product ${name} added successfully!`);
            navigate("/products");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  return (
    <div>
      <NavigationBar isLogged={authToken !== null} isAdmin={isAdmin} />
      <div
        style={{
          width: "350px",
          padding: "10px 20px",
          margin: "40px auto",
          height: "100%",
          textAlign: "center",
        }}
      >
        {dataLoading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Typography gutterBottom variant="h5" component="p" sx={{ mb: 3 }}>
              {isEditMode ? "Modify Product" : "Add Product"}
            </Typography>
            <TextField
              label="Name"
              onChange={(e) => setName(e.target.value)}
              required
              variant="outlined"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={name}
              error={nameError}
            />
            <div style={{ marginBottom: "30px" }}>
              <CreatableSelect
                className="basic-single"
                classNamePrefix="select"
                name="category"
                isClearable
                options={categoryList.map((item) => ({
                  label: item,
                  value: item,
                }))}
                value={category}
                onChange={(data) => setCategory(data)}
              />
            </div>
            <TextField
              label="Manufacturer"
              onChange={(e) => setManufacturer(e.target.value)}
              required
              variant="outlined"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={manufacturer}
              error={manufacturerError}
            />
            <TextField
              label="Available Items"
              onChange={(e) => setAvailableItems(e.target.value)}
              required
              variant="outlined"
              type="number"
              sx={{ mb: 3 }}
              fullWidth
              value={
                availableItems !== undefined
                  ? Number(availableItems)
                  : availableItems
              }
              error={availableItemsError}
            />
            <TextField
              label="Price"
              onChange={(e) => setPrice(e.target.value)}
              required
              variant="outlined"
              type="number"
              value={price !== undefined ? Number(price) : price}
              error={priceError}
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label="Image URL"
              onChange={(e) => setImageUrl(e.target.value)}
              variant="outlined"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={imageUrl}
            />
            <TextField
              label="Product Description"
              onChange={(e) => setProductDescription(e.target.value)}
              variant="outlined"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={productDescription}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2, width: "100%" }}
            >
              {isEditMode ? "Modify Product" : "Add Product"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddEditProduct;
