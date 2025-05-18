import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PopularSearchItem from "../miscellaneous/PopularSearchItem";
import { useState } from "react";

export function MultiItemSlider({ popularSearchData, left, right }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <Carousel className="w-full " onSlideChange={handleSlideChange}>
        <CarouselContent className="">
          {popularSearchData.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-4 md:basis-1/2 lg:basis-1/5"
            >
              <PopularSearchItem product={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden" ref={left} />
        <CarouselNext className="hidden" ref={right} />
        <div className="md:hidden">
          <CarouselDots />
        </div>
      </Carousel>
    </div>
  );
}
