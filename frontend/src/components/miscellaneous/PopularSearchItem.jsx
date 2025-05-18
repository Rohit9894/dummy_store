import { convertIntoIndian } from "@/utils/formattedPrice";
import React from "react";

function PopularSearchItem({ product }) {
  const { name, price, images } = product;
  return (
    <div className="w-full h-80 p-2  flex basis-auto flex-col justify-between  bg-white border-2   rounded-lg ">
      <img
        src={images[0]}
        alt="image"
        className="w-full aspect-[1/1] object-contain rounded-t-lg "
      />
      <div className="py-4 px-4 text-center">
        <div className="">
          <h2 className="font-medium text-primary mb-2">
            ₹ {convertIntoIndian(price)}
          </h2>
          <h3 className="text-sm line-through text-destructive ml-2">₹ 9999</h3>
        </div>
        <h1 className="text-md mb-4  font-semibold">{name}</h1>
      </div>
    </div>
  );
}

export default PopularSearchItem;
