import React, { useState } from "react";
import useAuth from '../../auth/useAuth';
import {
  Dialog,
  Button,
  IconButton,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { convertLength } from "@mui/material/styles/cssUtils";

const dialogContainerStyle = {
  backdropFilter: "blur(5px)",
  "& .MuiPaper-root": {
    borderRadius: "8px",
  },
  margin: "auto",
};

const SignInDialog = ({ open, onClick, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    // Check for errors in username, email, and password
    const emailValid = isValidEmailAddress(email);
    const passwordValid = isValidPassword(password);

    // Check if any of the fields are empty
    const fieldsNotEmpty = email.trim() !== "" && password.trim() !== "";

    // Define the API endpoint URL
    const apiUrl = "http://localhost:8080/signin";

    // Prepare the data to be sent in the request
    const userData = { email, password };

    // Call onSubmit only if there are no errors
    if (emailValid && passwordValid && fieldsNotEmpty) {
      // Make the API call using fetch
      fetch(apiUrl, {
        method: "POST", // Specify the method
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify(userData), // Convert the userData object into a JSON string
      })
      .then(response => {
        if (!response.ok) {
          // If server response is not ok, throw an error with the status
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json(); // Continue to process the response
        }
      })
      .then(data => {
        if (data.token) {
          // Use the login function to save the token and update auth state
          login(data.token);
          // Redirect to dashboard or show success message here
        } else {
          // Handle the case where no token is returned
          throw new Error('No token received after registration.');
        }
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error.message);
        // Here you can show an error message to the user based on `error.message`
      });
      onSubmit({ email, password });
    } else {
      console.log("ERROR");
    }
  };

  const isValidEmailAddress = (email) => {
    // Regular expression to validate email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      return true;
    }
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    // Regular expression to validate string (no spaces and special characters)
    return !password.includes(" ");
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} style={dialogContainerStyle}>
        <IconButton
          sx={{ position: "absolute", top: "8px", right: "8px" }}
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            width: "500px",
            height: "300px",
            p: 2,
            overflow: "hidden",
            margin: "auto",
          }}
        >
          {/* Adjust the width and height of the Box */}
          <Typography variant="h6" gutterBottom align="center">
            {/* Center align the text */}
            Sign In
          </Typography>
          <TextField
            id="outlined-basic-email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            error={!isValidEmailAddress(email)}
            helperText={
              isValidEmailAddress(email) ? "" : "Format: johndoe@gmail.com"
            }
          />
          <TextField
            id="outlined-basic-password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
            error={!isValidPassword(password)}
            helperText={
              isValidPassword(password) ? "" : "Password cannot contain spaces"
            }
          />
          <Button onClick={handleSubmit} sx={{ marginRight: 1 }}>
            Submit
          </Button>
          <p>
            Don't have an account? <a href="/register">Sign Up</a>.
          </p>
        </Box>
      </Dialog>
    </>
  );
};

export default SignInDialog;