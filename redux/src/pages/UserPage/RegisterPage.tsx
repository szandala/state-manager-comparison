import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useState } from "react";
import { useAccountRegisterMutation } from "../../generated/graphql";
import { useAlert } from "../../providers/AlertProvider";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [, executeMutation] = useAccountRegisterMutation();
  const alert = useAlert();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match", "error");
      return;
    }

    const { data, error: apiError } = await executeMutation({
      email,
      password,
    });

    if (data?.accountRegister?.user) {
      alert("Registration successful! Redirecting to login...", "success");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }

    const errors = data?.accountRegister?.errors;
    if (errors) {
      errors.forEach((error) =>
        alert(`${error.field}: ${error.code}`, "error")
      );
    }
    if (apiError) {
      alert(apiError.message, "error");
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          paddingY: 4,
        }}
      >
        <Typography variant="h4" sx={{ alignSelf: "center" }}>
          Register
        </Typography>
        <Box
          sx={{
            paddingY: 4,
            paddingX: 32,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleRegister}>
            Register
          </Button>
        </Box>
        <Typography variant="body2" sx={{ alignSelf: "center", marginTop: 2 }}>
          Already have an account?{" "}
          <Link href="/login">Click here to login</Link>
        </Typography>
      </Box>
    </Container>
  );
};
