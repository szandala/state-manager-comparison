import { Button, Tooltip, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useRecoilState } from "recoil";
import { sortState } from "../../recoil/sort";
import { useSetRecoilState } from "recoil";
import { searchState } from "../../recoil/search";

export const Sort = () => {
  const [sortOrder, setSortOrder] = useRecoilState(sortState);
  const setSearchQuery = useSetRecoilState(searchState);

  const handleSortToggle = () => {
    setSortOrder((prevOrder) => ({
      order: prevOrder.order === "ASC" ? "DESC" : "ASC",
    }));
    setSearchQuery({ query: "" }); // Reset search query when sorting
  };

  const button = (
    <Button onClick={handleSortToggle}>
      {(sortOrder.order === "ASC" || !sortOrder.order) && (
        <KeyboardArrowDownIcon />
      )}
      {sortOrder.order === "DESC" && <KeyboardArrowUpIcon />}
      {sortOrder.order || "RANK"}
    </Button>
  );

  return !sortOrder.order ? (
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
