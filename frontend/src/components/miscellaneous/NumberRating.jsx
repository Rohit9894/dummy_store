import { Star } from "lucide-react";
import React from "react";

function NumberRating() {
  return (
    <div className="custom_center gap-2  bg-background p-1 rounded-md self-end">
      <p className="text-white text-xs">4.3</p>
      <Star size={"10px"} color="#fff" fill="#fff" />
    </div>
  );
}

export default NumberRating;
