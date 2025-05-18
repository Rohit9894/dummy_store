import { Star } from "lucide-react";

function Rating() {
  return (
    <div className="flex">
      {[...Array(5)].map((_, ind) => (
        <Star
          key={ind}
          size={"15px"}
          color="hsl(45, 100%, 50%)"
          fill="hsl(45, 100%, 50%)"
        />
      ))}
    </div>
  );
}

export default Rating;
