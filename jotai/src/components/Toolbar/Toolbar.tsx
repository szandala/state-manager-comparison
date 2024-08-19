import { Box } from "@mui/material";
import { Filters } from "./Filters";
import { Search } from "./Search";
import { Sort } from "./Sort";

export const Toolbar = () => {
  return (
    <Box sx={{ display: "flex", paddingBottom: 4 }}>
      <Filters />
      <Search />
      <Box sx={{ flex: 1 }} />
      <Sort />
    </Box>
  );
};
