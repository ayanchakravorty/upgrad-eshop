import { useContext, useEffect, useState } from "react";
import NavigationBar from "../../NavigationBar";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ProductCard from "../productCard/ProductCard";
import { itemsList } from "../../common/mock";
import axios from "axios";
import { AuthContext } from "../../common/AuthContext";
import { useNavigate } from "react-router-dom";

function ProductsContainer() {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(itemsList);

  useEffect(() => {
    if (authToken !== null) {
      axios
        .get("http://localhost:8080/api/products", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          if (response.data.length > 0) {
            setData(response.data.length);
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      navigate("/login");
    }
  }, [authToken, navigate]);

  const handleCategoryChange = (event, newCategory) => {
    const newData =
      newCategory === "all"
        ? itemsList
        : itemsList.filter((item) => item.category === newCategory);
    setCategory(newCategory);
    setData(newData);
  };

  const handleSortChange = (event) => setSortBy(event.target.value);

  const handleSearchChange = (event) => {
    setTimeout(() => {
      const newData = itemsList.filter((item) =>
        item.name.includes(event.target.value)
      );
      setData(newData);
      setSearchTerm(event.target.value);
    }, 800);
  };

  return (
    <>
      <NavigationBar
        isLogged={authToken !== null}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <div
        style={{
          width: "1200px",
          padding: "10px 20px",
          margin: "20px auto",
          height: "100%",
        }}
      >
        <div style={{ marginBottom: 30, textAlign: "center" }}>
          <ToggleButtonGroup
            color="primary"
            value={category}
            exclusive
            onChange={handleCategoryChange}
            aria-label="Category"
          >
            <ToggleButton value="all">ALL</ToggleButton>
            <ToggleButton value="apparel">APPAREL</ToggleButton>
            <ToggleButton value="electronics">ELECTRONICS</ToggleButton>
            <ToggleButton value="personal-care">PERSONAL CARE</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div>
          <FormControl style={{ minWidth: 150, maxWidth: 250 }}>
            <InputLabel id="sort-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortBy}
              label="Sort"
              onChange={handleSortChange}
            >
              <MenuItem value={"default"}>Default</MenuItem>
              <MenuItem value={"htl"}>Price: High to Low</MenuItem>
              <MenuItem value={"lth"}>Price: Low to High</MenuItem>
              <MenuItem value={"new"}>Newest</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Grid container spacing={5} style={{ margin: "10px 0" }}>
          {data.map((item) => (
            <ProductCard key={item.id} productData={item} />
          ))}
        </Grid>
      </div>
    </>
  );
}

export default ProductsContainer;
