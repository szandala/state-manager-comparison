import { Box, Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useMeQuery } from "../../generated/graphql";
import { useEffect } from "react";
import { useAlert } from "../../providers/AlertProvider";
import useAuthStore from "../../zustand/authStore";

export const UserPage = () => {
  const [{ data, fetching, error }] = useMeQuery();
  const navigate = useNavigate();
  const alert = useAlert();
  const clearAuthState = useAuthStore((state) => state.clearAuthState);

  useEffect(() => {
    if (!fetching && (!data || !data.me || !data.me.email)) {
      if (error) {
        alert(error.message, "error");
      }
      navigate("/login");
    }
  }, [fetching, data, error, navigate, alert]);

  const handleLogout = () => {
    clearAuthState();
    alert("Successfully logged out", "success");
    navigate("/");
  };

  if (fetching) return null;

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
          Hello {data?.me?.email}!
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
          <Button variant="contained" component={Link} to="/reset-password">
            Change password
          </Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
