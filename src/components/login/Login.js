import { useState } from "react";
import NavigationBar from "../../NavigationBar";
import { Avatar, Button, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }

    if (email && password) {
      console.log(email, password);
      navigate("/products");
    }
  };

  return (
    <>
      <NavigationBar />
      <div
        style={{
          width: "500px",
          padding: "10px 20px",
          margin: "100px auto",
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, width: "100%" }}
          >
            Sign In
          </Button>
        </form>
      </div>
      <div style={{ textAlign: "center" }}>
        Copyright &copy; <Link href="https://www.upgrad.com/">upGrad</Link> 2023
      </div>
    </>
  );
}

export default Login;
