import { Button, Tooltip, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleSortOrder } from "../../redux/slices/sortSlice";
import { resetSearchQuery } from "../../redux/slices/searchSlice";

export const Sort = () => {
  const dispatch = useDispatch();
  const sortOrder = useSelector((state: RootState) => state.sort.order);

  const handleSortToggle = () => {
    dispatch(toggleSortOrder());
    dispatch(resetSearchQuery());
  };

  const button = (
    <Button onClick={handleSortToggle}>
      {(sortOrder === "ASC" || !sortOrder) && <KeyboardArrowDownIcon />}
      {sortOrder === "DESC" && <KeyboardArrowUpIcon />}
      {sortOrder || "RANK"}
    </Button>
  );

  return !sortOrder ? (
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
