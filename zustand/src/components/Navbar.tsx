// src/components/Navbar.tsx
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  InputBase,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { fetchGraphQL } from "../graphql/client";
import { GET_COLLECTIONS } from "../graphql/queries";
import { useSearchStore } from "../store/useSearchStore";

interface Collection {
  id: string;
  name: string;
}

const Navbar: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const searchQuery = useSearchStore((state) => state.query);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data: any = await fetchGraphQL(GET_COLLECTIONS);
        const collections = data.collections.edges.map(
          (edge: any) => edge.node
        );
        setCollections(collections);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          Zustand
        </Typography>
        <Button component={Link} to="/" color="inherit">
          Products
        </Button>
        <Button color="inherit" onClick={handleMenu}>
          Collections
        </Button>
        <Menu
          id="collections-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {collections.map((collection) => (
            <MenuItem
              key={collection.id}
              component={Link}
              to={`/collection/${collection.id}`}
              onClick={handleClose}
            >
              {collection.name}
            </MenuItem>
          ))}
        </Menu>
        <Box sx={{ flexGrow: 1 }} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ position: "relative", marginRight: "16px" }}>
            <SearchIcon
              style={{
                position: "absolute",
                top: "50%",
                left: "8px",
                transform: "translateY(-50%)",
              }}
            />
            <InputBase
              placeholder="Search…"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                paddingLeft: "32px",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: "4px",
              }}
            />
          </div>
          <IconButton component={Link} to="/checkout" color="inherit">
            <ShoppingCartIcon />
          </IconButton>
          <IconButton component={Link} to="/user" color="inherit">
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
