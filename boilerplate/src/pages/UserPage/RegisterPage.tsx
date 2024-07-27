import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";

export const RegisterPage = () => {
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
          <TextField label="Username" variant="outlined" fullWidth />
          <TextField label="Email" type="email" variant="outlined" fullWidth />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" color="primary">
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
