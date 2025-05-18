

import Rating from "./Rating";

function TopSlectedItem() {
  return (
    <div className="w-full h-60  flex flex-col justify-between  bg-white rounded-md shadow-md">
      <img
        src="https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1vYmlsZXxlbnwwfHwwfHx8MA%3D%3D"
        alt="image"
        className="w-full h-[60%] object-cover rounded-t-md "
      />
      <div className="py-4 px-4">
        <h1 className="text-md mb-4  font-semibold">Smart Watch</h1>
        <div className="flex justify-between">
          <h2 className="text-sm font-medium text-primary mb-2">₹ 1999 <span className="line-through text-destructive ml-2">₹ 9999</span></h2>
          <Rating />
        </div>
      </div>
    </div>
  );
}

export default TopSlectedItem;
