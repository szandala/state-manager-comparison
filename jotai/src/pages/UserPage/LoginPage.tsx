import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useState } from "react";
import { useCreateTokenMutation } from "../../generated/graphql";
import { useAtom } from "jotai";
import { authAtom } from "../../jotai/authAtom";
import { useAlert } from "../../providers/AlertProvider";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, executeMutation] = useCreateTokenMutation();
  const [, setAuthState] = useAtom(authAtom);
  const alert = useAlert();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error: apiError } = await executeMutation({
      email,
      password,
    });

    if (data?.tokenCreate?.token && data?.tokenCreate?.refreshToken) {
      setAuthState({
        token: data.tokenCreate.token,
        refreshToken: data.tokenCreate.refreshToken,
        errors: null,
      });
      alert("Login successful!", "success");
      setTimeout(() => {
        navigate("/user");
      }, 100);
    }

    const errors = data?.tokenCreate?.errors;
    if (errors) {
      errors.forEach((error) =>
        alert(error.message ?? "Unexpected error", "error")
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
          Login
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
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Box>
        <Typography variant="body2" sx={{ alignSelf: "center", marginTop: 2 }}>
          Don't have an account yet?{" "}
          <Link href="/register">Click here to register</Link>
        </Typography>
      </Box>
    </Container>
  );
};
