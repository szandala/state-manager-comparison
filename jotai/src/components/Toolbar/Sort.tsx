import { Button, Tooltip, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAtom } from "jotai";
import { sortAtom } from "../../jotai/sortAtom";
import { searchAtom } from "../../jotai/searchAtom";

export const Sort = () => {
  const [sortOrder, setSortOrder] = useAtom(sortAtom);
  const [, setSearchQuery] = useAtom(searchAtom);

  const handleSortToggle = () => {
    setSortOrder((prev) => ({
      ...prev,
      order: prev.order === "ASC" ? "DESC" : "ASC",
    }));
    setSearchQuery({ query: "" });
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
