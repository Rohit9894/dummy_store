import Rating from "@/components/miscellaneous/Rating";
import { Button } from "@/components/ui/button";
import { Check, Minus, Plus } from "lucide-react";
import React from "react";

function SingleItem() {
  return (
    <div className="container mt-10">
      <section className="flex md:flex-row flex-col md:items-center gap-10" id="product details">
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1vYmlsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="image"
            className="w-full max-h-[350px] object-cover rounded-t-lg "
          />
        </div>
        <div className="w-full md:w-1/2">
          <div className="text-left">
            <h1 className="text-lg mb-1  font-semibold">HP Pavillion</h1>
            <div className="custom_center gap-10">
              {" "}
              <Rating />
              <div className="custom_center gap-2 text-teal">
                <Check size={"20px"} />{" "}
                <span className="text-dark text-sm">231 Sold</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-6 mt-8">
            <div className="flex items-center gap-2">
              <h2 className="font-medium text-background text-2xl">₹ 1999 </h2>
              <p className="text-lg line-through text-teal-500  text-teal">
                ₹ 9999
              </p>
              <span className="text-xs text-light bg-background p-1 rounded-md">
                30% off
              </span>
            </div>
          </div>
          <p className=" mt-4 ">
            Acer One Intel Core i3 11th Gen 1115G4 - (8 GB/512 GB SSD/Windows 11
            Home) AO 14 Z 8-415 Thin and Light Laptop (14 Inch, Silver, 1.49 Kg)
          </p>

          <ul type="" className="mt-4 ">
            <li>Ram : 16 GB </li>
            <li>Rom : 512 GB</li>
            <li>Processor : Intel Core i3 11th Gen</li>
            <li>Display : 14 inch</li>
          </ul>

          {/* buttons */}
          <div className="flex-col justify-between mt-10">
            {/* Quantity Update */}
            <div className="flex text-teal items-center py-2 px-4 justify-between w-40 border-2 5 border-teal border-solid rounded-md">
              <Minus cursor={"pointer"} size={"20px"} />
              <span className="text-black"> 1</span>
              <Plus cursor={"pointer"} size={"20px"} />
            </div>
            <div className="custom_center justify-between md:gap-4 mt-4">
            <Button className="text-light py-5 px-8 border-2 border-background bg-background">
                ADD TO CART
              </Button>
              <Button
                variant="outline"
                className="bg-white py-5 border-2 border-background text-background  px-8 "
              >
                BUY
              </Button>
          
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SingleItem;
