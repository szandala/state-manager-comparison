import { Button, Tooltip, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSort } from "../../contexts/SortContext";
import { useSearch } from "../../contexts/SearchContext";

export const Sort = () => {
  const { state: sortState, dispatch: sortDispatch } = useSort();
  const { dispatch: searchDispatch } = useSearch();

  const handleSortToggle = () => {
    sortDispatch({ type: "TOGGLE_SORT_ORDER" });
    searchDispatch({ type: "RESET_SEARCH_QUERY" });
  };

  const button = (
    <Button onClick={handleSortToggle}>
      {(sortState.order === "ASC" || !sortState.order) && (
        <KeyboardArrowDownIcon />
      )}
      {sortState.order === "DESC" && <KeyboardArrowUpIcon />}
      {sortState.order || "RANK"}
    </Button>
  );

  return !sortState.order ? (
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
};
