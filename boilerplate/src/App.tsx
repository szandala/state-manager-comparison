// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import CollectionPage from "./pages/CollectionPage";

const App: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Router>
        <CssBaseline />
        <Navbar />
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route
              path="/collection/:collectionId"
              element={<CollectionPage />}
            />
            <Route path="/checkout" element={<div>Checkout Page</div>} />
            <Route path="/user" element={<div>User Page</div>} />
          </Routes>
        </Box>
        <Footer />
      </Router>
    </Box>
  );
};

export default App;
