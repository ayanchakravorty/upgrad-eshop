import { Avatar, Button, TextField } from "@mui/material";
import NavigationBar from "../../NavigationBar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setContactNumberError(false);

    if (firstName === "") {
      setFirstName(true);
    }
    if (lastName === "") {
      setLastName(true);
    }
    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
    if (contactNumber === "") {
      setContactNumberError(true);
    }

    if (firstName && lastName && email && password && contactNumber) {
      console.log(firstName, lastName, email, password);
      axios
        .post("http://localhost:8080/api/auth/signup", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          contactNumber: contactNumber,
        })
        .then(function (response) {
          console.log(response.data);
          navigate("/login");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
      <NavigationBar />
      <div
        style={{
          width: "350px",
          padding: "10px 20px",
          margin: "75px auto",
          height: "100%",
          textAlign: "center",
        }}
      >
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Avatar
            style={{
              backgroundColor: "deeppink",
              margin: "10px auto",
            }}
          >
            <LockIcon />
          </Avatar>
          <TextField
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
            variant="outlined"
            type="text"
            sx={{ mb: 3 }}
            fullWidth
            value={firstName}
            error={firstNameError}
          />
          <TextField
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
            variant="outlined"
            type="text"
            sx={{ mb: 3 }}
            fullWidth
            value={lastName}
            error={lastNameError}
          />
          <TextField
            label="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            type="email"
            sx={{ mb: 3 }}
            fullWidth
            value={email}
            error={emailError}
          />
          <TextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            type="password"
            value={password}
            error={passwordError}
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            variant="outlined"
            type="password"
            value={confirmPassword}
            error={password.length > 0 && confirmPassword !== password}
            fullWidth
            sx={{ mb: 3 }}
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, width: "100%" }}
            disabled={password.length > 0 && confirmPassword !== password}
          >
            Sign Up
          </Button>
          <div style={{ textAlign: "right", margin: "10px 0" }}>
            <Link to="/login">Already have an account? Sign in</Link>
          </div>
        </form>
      </div>
      <div style={{ textAlign: "center" }}>
        Copyright &copy; <Link href="https://www.upgrad.com/">upGrad</Link> 2023
      </div>
    </>
  );
}

export default Signup;
