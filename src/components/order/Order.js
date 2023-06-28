import { Fragment, useContext, useEffect, useState } from "react";
import Select from "react-select";
import { AuthContext } from "../../common/AuthContext";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  TextField,
} from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../navigationBar/NavigationBar";

import "./Order.css";

const steps = ["Items", "Select Address", "Confirm Order"];

function Order() {
  const { authToken, userId, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [activeStep, setActiveStep] = useState(0);

  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [nameError, setNameError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [stateNameError, setStateNameError] = useState(false);
  const [zipCodeError, setZipCodeError] = useState(false);

  const [addressList, setAddressList] = useState([]);
  const [currentAddress, setCurrentAddress] = useState();
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      axios
        .post(
          `http://localhost:8080/api/orders`,
          {
            quantity: state.quantity,
            user: userId ?? "64982c40668e1d1dc3ed0ace",
            product: state.id,
            address: currentAddress.id,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((response) => {
          alert("Order placed successfully");
          navigate("/products");
        })
        .catch((error) => console.error("Error placing order:", error));
    } else {
      if (activeStep === 1 && currentAddress === undefined) {
        alert("Please select an address!");
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddressSubmit = (event) => {
    event.preventDefault();

    setNameError(false);
    setContactNumberError(false);
    setStreetError(false);
    setCityError(false);
    setStateNameError(false);
    setZipCodeError(false);

    if (name === "") {
      setNameError(true);
    }
    if (street === "") {
      setStreetError(true);
    }
    if (city === "") {
      setCityError(true);
    }
    if (stateName === "") {
      setStateNameError(true);
    }
    if (zipCode === "") {
      setZipCodeError(true);
    }
    if (contactNumber === "") {
      setContactNumberError(true);
    }

    if (name && street && city && stateName && zipCode && contactNumber) {
      const addressObj = {
        name: name,
        contactNumber: contactNumber,
        street: street,
        city: city,
        state: stateName,
        landmark: landmark,
        zipcode: zipCode,
        user: userId ?? "64982c40668e1d1dc3ed0ace",
      };
      axios
        .post(`http://localhost:8080/api/addresses`, addressObj, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then(() => {
          alert("Success: Address is successfully saved.");
          axios
            .get(`http://localhost:8080/api/addresses`, {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            })
            .then((response) => {
              setAddressList(response.data);
            })
            .catch((error) => console.error("Error fetching data:", error));
        })
        .catch(() =>
          alert(
            "Error: There was an issue in saving the address. Please provide correct details."
          )
        );
    }
  };

  const handleCurrentAddress = (add) => setCurrentAddress(add);

  useEffect(() => {
    if (authToken !== null) {
      axios
        .get(`http://localhost:8080/api/addresses`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setAddressList(response.data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [authToken]);

  const renderProductDetails = () => (
    <div className="productDetails">
      <Typography gutterBottom variant="h5" component="p">
        {state.name}
      </Typography>
      <Typography gutterBottom variant="body1" component="p">
        Quantity: {state.quantity}
      </Typography>
      <Typography gutterBottom variant="body1" component="div" sx={{ mb: 2 }}>
        Category: {state.category}
      </Typography>
      <Typography
        gutterBottom
        variant="body2"
        component="p"
        sx={{ fontStyle: "italic" }}
      >
        {state.description}
      </Typography>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ color: "red", my: 2 }}
      >
        Total Price: ₹{state.price * state.quantity}
      </Typography>
    </div>
  );

  return authToken !== null ? (
    <div>
      <NavigationBar isLogged={authToken !== null} isAdmin={isAdmin} />
      <Box className="orderContainer">
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Fragment>
          {activeStep === 0 ? (
            <div className="stepContainer1">
              <div>
                <img
                  src={state.imageUrl}
                  alt={`${state.name}`}
                  width={250}
                  height={250}
                />
              </div>
              {renderProductDetails()}
            </div>
          ) : activeStep === 1 ? (
            <div className="stepContainer2">
              <form>
                <label>Select Address:</label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  name="address"
                  getOptionLabel={(item) => item.name}
                  getOptionValue={(item) => item.id}
                  options={addressList}
                  onChange={(data) => handleCurrentAddress(data)}
                />
                <p className="orSeparator">--OR--</p>
                <div className="center">
                  <Typography gutterBottom variant="h6" component="div">
                    Add Address
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
                  <TextField
                    label="Contact Number"
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                    variant="outlined"
                    type="tel"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={contactNumber}
                    error={contactNumberError}
                  />
                  <TextField
                    label="Street"
                    onChange={(e) => setStreet(e.target.value)}
                    required
                    variant="outlined"
                    type="text"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={street}
                    error={streetError}
                  />
                  <TextField
                    label="City"
                    onChange={(e) => setCity(e.target.value)}
                    required
                    variant="outlined"
                    type="text"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={city}
                    error={cityError}
                  />
                  <TextField
                    label="State"
                    onChange={(e) => setStateName(e.target.value)}
                    required
                    variant="outlined"
                    type="text"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={stateName}
                    error={stateNameError}
                  />
                  <TextField
                    label="Landmark"
                    onChange={(e) => setLandmark(e.target.value)}
                    variant="outlined"
                    type="text"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={landmark}
                  />
                  <TextField
                    label="Zip Code"
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                    variant="outlined"
                    type="text"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={zipCode}
                    error={zipCodeError}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ mt: 2, width: "100%" }}
                    onClick={handleAddressSubmit}
                  >
                    Save Address
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="stepContainer3">
              {renderProductDetails()}
              <div>
                <Typography gutterBottom variant="h5" component="p">
                  Address Details:
                </Typography>
                <Typography gutterBottom variant="body2" component="p">
                  {currentAddress.name}
                </Typography>
                <Typography gutterBottom variant="body2" component="p">
                  Contact Number: {currentAddress.contactNumber}
                </Typography>
                <Typography gutterBottom variant="body2" component="p">
                  {`${currentAddress.street}, ${currentAddress.city}`}
                </Typography>
                <Typography gutterBottom variant="body2" component="p">
                  {currentAddress.state}
                </Typography>
                <Typography gutterBottom variant="body2" component="p">
                  {currentAddress.zipcode}
                </Typography>
              </div>
            </div>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              justifyContent: "center",
            }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Place Order" : "Next"}
            </Button>
          </Box>
        </Fragment>
      </Box>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default Order;
