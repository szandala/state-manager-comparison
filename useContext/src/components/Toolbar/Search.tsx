import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useSearch } from "../../contexts/SearchContext";
import { useSort } from "../../contexts/SortContext";

export const Search = () => {
  const { state: searchState, dispatch: searchDispatch } = useSearch();
  const { dispatch: sortDispatch } = useSort();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchDispatch({ type: "SET_SEARCH_QUERY", payload: event.target.value });
    sortDispatch({ type: "CLEAR_SORT_ORDER" });
  };

  return (
    <Box sx={{ paddingX: 2 }}>
      <TextField
        id="input-with-icon-textfield"
        placeholder="Search..."
        value={searchState.query}
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
