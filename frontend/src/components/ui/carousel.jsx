import * as React from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import useEmblaCarousel from "embla-carousel-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const CarouselContext = React.createContext(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

const Carousel = React.forwardRef(
  (
    { orientation = "horizontal", opts, setApi, plugins, className, children, ...props },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel({
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    }, plugins)

    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)
    const [scrollSnaps, setScrollSnaps] = React.useState([])
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const onSelect = React.useCallback((api) => {
      if (!api) return
      setSelectedIndex(api.selectedScrollSnap())
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api])
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api])
    const scrollTo = React.useCallback((index) => api?.scrollTo(index), [api])

    React.useEffect(() => {
      if (!api) return
      setApi?.(api)
      setScrollSnaps(api.scrollSnapList())
      onSelect(api)
      api.on("select", onSelect)
      api.on("reInit", onSelect)
      return () => {
        api.off("select", onSelect)
      }
    }, [api, setApi, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          orientation,
          scrollPrev,
          scrollNext,
          scrollTo,
          canScrollPrev,
          canScrollNext,
          scrollSnaps,
          selectedIndex,
        }}
      >
        <div
          ref={ref}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev, orientation } = useCarousel()
  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeftIcon className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext, orientation } = useCarousel()
  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRightIcon className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

const CarouselDots = () => {
  const { scrollSnaps, scrollTo, selectedIndex } = useCarousel()

  return (
    <div className="flex justify-center gap-2 mt-4">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          onClick={() => scrollTo(index)}
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            selectedIndex === index ? "bg-black" : "bg-gray-300"
          )}
        />
      ))}
    </div>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots
}
