import { Fragment, useContext, useState } from "react";
import NavigationBar from "../../NavigationBar";
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
import { Navigate, useLocation } from "react-router-dom";

const steps = ["Items", "Select Address", "Confirm Order"];

function Order() {
  const { authToken } = useContext(AuthContext);
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddressSubmit = () => {
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
        zipCode: zipCode,
      };
      console.log(addressObj);
    }
  };

  return authToken !== null ? (
    <div>
      <NavigationBar isLogged={authToken !== null} />
      <Box sx={{ width: "1200px", margin: "50px auto" }}>
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
                  src={state.imageUrl}
                  alt={`${state.name}`}
                  width={250}
                  height={250}
                />
              </div>
              <div
                style={{
                  padding: "10px 20px",
                }}
              >
                <Typography gutterBottom variant="h5" component="p">
                  {state.name}
                </Typography>
                <Typography gutterBottom variant="body1" component="p">
                  Quantity: {state.quantity}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  sx={{ mb: 2 }}
                >
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
            </div>
          ) : activeStep === 1 ? (
            <div
              style={{
                width: "500px",
                padding: "10px 20px",
                margin: "50px auto",
                height: "100%",
                display: "flex",
                gap: 2,
              }}
            >
              <form
                style={{
                  width: "100%",
                }}
              >
                <label>Select Address:</label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  name="address"
                  options={[]}
                  onChange={handleAddressSubmit}
                />
                <p
                  style={{
                    margin: "30px 0",
                    textAlign: "center",
                  }}
                >
                  --OR--
                </p>
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
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
            <p>Step 3</p>
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
