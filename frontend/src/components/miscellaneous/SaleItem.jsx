
import Rating from "./Rating";
import { Button } from "../ui/button";

function SaleItem() {
  return (
    <div className="bg-white w-full p-4 rounded-md flex gap-4">
      <img
        src="https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1vYmlsZXxlbnwwfHwwfHx8MA%3D%3D"
        alt="image"
        className="w-1/3 h-[140px] object-cover rounded-md "
      />
      <div className="flex flex-col justify-between">
        <div>
          <h1 className=" font-semibold">Fitness and activity tracker</h1>
        </div>
        <div>
          <h2 className="text-md font-medium text-primary mb-2">
            ₹ 1999{" "}
            <span className="line-through text-sm text-destructive ml-2">₹ 9999</span>
          </h2>
          <Rating />
          <p className="text-sm text-destructive">Hurry only few left</p>
          <Button className="bg-background mt-2">Buy Now</Button>
        </div>
      </div>
    </div>
  );
}

export default SaleItem;
