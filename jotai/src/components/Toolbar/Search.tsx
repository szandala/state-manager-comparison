import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useAtom } from "jotai";
import { searchAtom } from "../../jotai/searchAtom";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchAtom);

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
