import {
  Carousel,
  CarouselContent,
  CarouselItem,


} from "@/components/ui/carousel";
import AutoPlay from "embla-carousel-autoplay";
function Slider({data}) {

  return (
    <Carousel
      
      plugins={[
        AutoPlay({
          delay: 2000,
        }),
      ]}
      className="  w-full  mt-10 mx-auto"
    >
      <CarouselContent>
        {data?.images.map((item, index) => (
          <CarouselItem key={index} className="aspect-[35/20] md:aspect-auto">
            <img
              className="w-full h-full rounded-md object-cover"
              src={item}
              alt="Super Deal"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default Slider;
