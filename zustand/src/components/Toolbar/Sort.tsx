import { Button, Tooltip, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useSortStore from "../../zustand/sortStore";
import useSearchStore from "../../zustand/searchStore";

export const Sort = () => {
  const { order, toggleSortOrder } = useSortStore();
  const resetSearchQuery = useSearchStore((state) => state.resetSearchQuery);

  const handleSortToggle = () => {
    toggleSortOrder();
    resetSearchQuery();
  };

  const button = (
    <Button onClick={handleSortToggle}>
      {(order === "ASC" || !order) && <KeyboardArrowDownIcon />}
      {order === "DESC" && <KeyboardArrowUpIcon />}
      {order || "RANK"}
    </Button>
  );

  return !order ? (
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
