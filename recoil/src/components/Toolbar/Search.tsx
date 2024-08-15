import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useRecoilState } from "recoil";
import { searchState } from "../../recoil/search";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useRecoilState(searchState);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery({ query: event.target.value });
  };

  return (
    <Box sx={{ paddingX: 2 }}>
      <TextField
        id="input-with-icon-textfield"
        placeholder="Search..."
        value={searchQuery.query}
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
};
