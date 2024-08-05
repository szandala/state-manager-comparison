import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setSearchQuery } from "../../redux/slices/searchSlice";

export const Search = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <Box sx={{ paddingX: 2 }}>
      <TextField
        id="input-with-icon-textfield"
        placeholder="Search..."
        value={searchQuery}
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
