


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TopSlectedItem from "../miscellaneous/TopSelectedItem";

export function MultiSlider({ left, right }) {
  return (
    <Carousel className="w-full ">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/4">
            <TopSlectedItem />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden" ref={left} />
      <CarouselNext className="hidden" ref={right} />
    </Carousel>
  );
}
