import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Popover,
  Select,
  SelectChangeEvent,
  Slider,
  Typography,
} from "@mui/material";
import React from "react";
import {
  useGetAttributesQuery,
  useGetCategoriesQuery,
} from "../../generated/graphql";
import { useRecoilState } from "recoil";
import { filterState } from "../../recoil/filter";

export const Filters = () => {
  const [filter, setFilter] = useRecoilState(filterState);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [tempPriceRange, setTempPriceRange] = React.useState([
    filter.priceRange?.gte ?? 0,
    filter.priceRange?.lte ?? 300,
  ]);

  const handlePriceRange = (_event: any, newValue: number | number[]) => {
    setTempPriceRange(newValue as number[]);
  };

  const handlePriceRangeCommited = () => {
    setFilter((prev) => ({
      ...prev,
      priceRange: {
        gte: tempPriceRange[0],
        lte: tempPriceRange[1],
      },
    }));
  };

  const [{ data: dataCategories }] = useGetCategoriesQuery();
  const categories = dataCategories?.categories?.edges ?? [];
  const handleChangeCategory = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setFilter((prev) => ({
      ...prev,
      categories: typeof value === "string" ? [value] : value,
    }));
  };

  const [{ data: dataAttributes }] = useGetAttributesQuery();
  const attributes = dataAttributes?.attributes?.edges ?? [];

  const handleAttributeChange =
    (slug: string | undefined | null) =>
    (event: SelectChangeEvent<string[]>) => {
      if (!slug) {
        return;
      }
      const {
        target: { value },
      } = event;
      setFilter((prev) => {
        const newAttributes = prev.attributes.filter(
          (attr) => attr.slug !== slug
        );
        if (value.length) {
          newAttributes.push({
            slug,
            values: typeof value === "string" ? [value] : value,
          });
        }
        return { ...prev, attributes: newAttributes };
      });
    };

  const handleStockAvailabilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilter((prev) => ({
      ...prev,
      stockAvailability: event.target.checked,
    }));
  };

  const handleResetFilters = () => {
    setFilter({
      stockAvailability: false,
      priceRange: null,
      categories: [],
      attributes: [],
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick} variant="contained">
        Filter
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr"
          alignItems="center"
          padding={2}
          columnGap={4}
          rowGap={2}
        >
          <Typography fontWeight="bold">Stock Available</Typography>
          <Checkbox
            sx={{ justifySelf: "right" }}
            checked={filter.stockAvailability}
            onChange={handleStockAvailabilityChange}
          />
          <Typography fontWeight="bold">Price Range</Typography>
          <Checkbox
            sx={{ justifySelf: "right" }}
            checked={Boolean(filter.priceRange)}
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                priceRange: e.target.checked ? { gte: 0, lte: 300 } : null,
              }))
            }
          />
          <Box gridColumn="span 2" paddingX={2}>
            <Slider
              value={tempPriceRange as [number, number]}
              onChange={handlePriceRange}
              onChangeCommitted={handlePriceRangeCommited}
              disabled={!filter.priceRange}
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: "$0" },
                { value: 300, label: "$300" },
              ]}
              min={0}
              max={300}
            />
          </Box>
          <Typography fontWeight="bold">Category</Typography>
          <Checkbox sx={{ justifySelf: "right" }} />
          <FormControl sx={{ gridColumn: "span 2" }}>
            <InputLabel id="demo-multiple-name-label">Category</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={filter.categories}
              onChange={handleChangeCategory}
              input={<OutlinedInput label="Category" />}
            >
              {categories.map((edge) => (
                <MenuItem key={edge.node.id} value={edge.node.id}>
                  {edge.node.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography fontWeight="bold" sx={{ gridColumn: "span 2" }}>
            Custom Attributes
          </Typography>
          {attributes.map((attribute) => {
            const choices = attribute.node.choices?.edges ?? [];
            const selectedValues =
              filter.attributes.find(
                (attr) => attr.slug === attribute.node.slug
              )?.values || [];
            return (
              <FormControl
                key={attribute.node.id}
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel id={`attribute-${attribute.node.id}`}>
                  {attribute.node.name}
                </InputLabel>
                <Select
                  labelId={`attribute-${attribute.node.id}`}
                  id={`attribute-${attribute.node.id}`}
                  multiple
                  value={selectedValues}
                  onChange={handleAttributeChange(attribute.node.slug)}
                  input={<OutlinedInput label={attribute.node.name} />}
                >
                  {choices?.map((choice) => (
                    <MenuItem
                      key={choice.node.id}
                      value={choice.node.slug ?? ""}
                    >
                      {choice.node.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          })}
          <Button variant="outlined" onClick={handleResetFilters}>
            Reset
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Popover>
    </div>
  );
};
