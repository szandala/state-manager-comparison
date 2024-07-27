import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";

export const LoginPage = () => {
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
          <TextField label="Username" variant="outlined" fullWidth />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" color="primary">
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
