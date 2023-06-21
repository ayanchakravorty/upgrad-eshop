import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, Grid } from "@mui/material";
import SearchInput from "./components/search/SearchInput";

function NavigationBar(props) {
  const { isLogged, isAdmin } = props;
  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "#3f51b5",
      }}
    >
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <ShoppingCartIcon />
              <Typography variant="body1" component="span">
                upGrad E-Shop
              </Typography>
            </IconButton>
          </Grid>
          <Grid item xs={3}>
            <SearchInput />
          </Grid>
          <Grid item xs={4} textAlign={"right"}>
            {isLogged ? (
              isAdmin ? (
                <div>
                  <Button color="inherit" variant="text">
                    Home
                  </Button>
                  <Button color="inherit" variant="text">
                    Add Product
                  </Button>
                  <Button variant="contained" color="error">
                    Logout
                  </Button>
                </div>
              ) : (
                <div>
                  <Button color="inherit" variant="text">
                    Home
                  </Button>
                  <Button variant="contained" color="error">
                    Logout
                  </Button>
                </div>
              )
            ) : (
              <div>
                <Button color="inherit" variant="text">
                  Login
                </Button>
                <Button color="inherit" variant="text">
                  Sign Up
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
