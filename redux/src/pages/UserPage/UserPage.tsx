import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const UserPage = () => {
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
          Hello Joe!
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
          <Button variant="contained" color="error">
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
