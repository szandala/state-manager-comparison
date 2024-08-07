// src/components/Sort.tsx
import { Button, Tooltip, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { observer } from "mobx-react-lite";
import sortStore from "../../mobx/sortStore";
import searchStore from "../../mobx/searchStore";

export const Sort = observer(() => {
  const handleSortToggle = () => {
    sortStore.toggleSortOrder();
    searchStore.resetSearchQuery();
  };

  const button = (
    <Button onClick={handleSortToggle}>
      {(sortStore.order === "ASC" || !sortStore.order) && (
        <KeyboardArrowDownIcon />
      )}
      {sortStore.order === "DESC" && <KeyboardArrowUpIcon />}
      {sortStore.order || "RANK"}
    </Button>
  );

  return !sortStore.order ? (
    <Tooltip
      arrow
      title={
        <Typography>
          You are searching through items and they are sorted by best match.
          Click to clear the search.
        </Typography>
      }
    >
      {button}
    </Tooltip>
  ) : (
    button
  );
});

export default Sort;
