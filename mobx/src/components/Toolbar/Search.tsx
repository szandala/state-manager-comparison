// src/components/Search.tsx
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { observer } from "mobx-react-lite";
import searchStore from "../../mobx/searchStore";

export const Search: React.FC = observer(() => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchStore.setSearchQuery(event.target.value);
  };

  return (
    <Box sx={{ paddingX: 2 }}>
      <TextField
        id="input-with-icon-textfield"
        placeholder="Search..."
        value={searchStore.searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        size="small"
      />
    </Box>
  );
});

export default Search;
