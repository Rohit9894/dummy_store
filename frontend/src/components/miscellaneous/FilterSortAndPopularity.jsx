import { useState } from "react";

function FilterSortAndPopularity({ handleFilterValue }) {
  const [filter, setFilter] = useState("");
  function handleFilter(sortBy, order, active) {
    setFilter(active);
    handleFilterValue(sortBy, order);
  }
  return (
    <div className="flex text-sm justify-between w-1/2">
      <h2 className=" font-medium">Sort By</h2>
      <div
        onClick={() => handleFilter("price", "asc", "lth")}
        className={`${
          filter === "lth"
            ? "active-sort-and-popularity-item"
            : "sort-and-popularity-item"
        }`}
      >
        Price -- Low to High
      </div>
      <div
        onClick={() => handleFilter("price", "desc", "htl")}
        className={`${
          filter === "htl"
            ? "active-sort-and-popularity-item"
            : "sort-and-popularity-item"
        }`}
      >
        Price -- High to Low
      </div>
      <div
        onClick={() => handleFilter("createdAt", "desc", "new")}
        className={`${
          filter === "new"
            ? "active-sort-and-popularity-item"
            : "sort-and-popularity-item"
        }`}
      >
        Newest First
      </div>
    </div>
  );
}

export default FilterSortAndPopularity;
