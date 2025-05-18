
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


import SaleItem from "../miscellaneous/SaleItem";

export function SaleSlider({ left, right }) {
  return (
    <Carousel className="w-full ">
      <CarouselContent className="">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/2">
            <SaleItem />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden" ref={left} />
      <CarouselNext className="hidden" ref={right} />
    </Carousel>
  );
}
