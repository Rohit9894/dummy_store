
import React from "react";
import Rating from "./Rating";
import { convertIntoIndian } from "@/utils/formattedPrice";

function BestDealItem({productData}) {
  const {images,name,price}=productData;
  {/* <div className="w-full bg-background py-4 md:h-60 rounded-lg flex md:!flex-row flex-col md:items-center gap-8"> */}
  return (
    <div className=" md:h-[120px] mt-10  flex md:!flex-row flex-col  gap-4 items-center p-2">
      <div className="full md:w-1/2 ">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover rounded-md "
        />
      </div>

      <div className="flex flex-col text-center md:text-left justify-between">
        <h2 className="text-sm font-medium">{name}</h2>
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-sm font-medium text-primary mb-2">₹ {convertIntoIndian(price)}</h2>
          <Rating />
        </div>
      </div>
    </div>
  );
}

export default BestDealItem;
