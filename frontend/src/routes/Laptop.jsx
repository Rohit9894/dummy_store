import FilterSortAndPopularity from "@/components/miscellaneous/FilterSortAndPopularity";
import ProductBanner from "@/components/miscellaneous/ProductBanner";
import ProductItem from "@/components/miscellaneous/ProductItem";
import LaptopSkeleton from "@/components/miscellaneous/skeleton/LaptopSkeleton";
import SomeThingWentWrong from "@/components/miscellaneous/uiErrors/SomeThingWentWrong";
import { Slider } from "@/components/ui/slider";
import { useGetProductsQuery } from "@/features/product/product.api";
import { useState } from "react";

const Laptop = () => {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    order: "",
  });
  const {
    data: productsData,
    isLoading,
    error,
  } = useGetProductsQuery(queryParams);
  function handleFilter(sortBy, order) {
    setQueryParams((prev) => ({
      ...prev,
      sortBy,
      order,
    }));
  }
  console.log(isLoading);
  return (
    <div className="container mt-16">
      <div className="grid grid-cols-12 md:gap-10">
        {/* Filter Box */}
        <div className="col-span-3">
          <h2 className="text-md font-medium mt-10">Filters</h2>
          <div className="mt-8">
            <h4 className="text-md mb-4">Price range</h4>
            <Slider defaultValue={[33]} max={100} step={1} />
          </div>
        </div>
        {/* Products Section  */}
        <div className="col-span-9 ">
          <div className="mb-8 flex justify-between items-baseline">
            <h2 className="font-medium">Laptops Products</h2>
            {/* sort and populirity */}
            <FilterSortAndPopularity handleFilterValue={handleFilter} />
          </div>
          {error ? (
            <SomeThingWentWrong />
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-between">
              {isLoading
                ? Array.from({ length: 8 }).map((item, i) => (
                    <LaptopSkeleton key={i} />
                  ))
                : productsData &&
                  productsData?.data.map((item, index) => (
                    <ProductItem key={item?.id} productData={item} />
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Laptop;
