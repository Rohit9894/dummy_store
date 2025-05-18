import { Button } from "../ui/button";
import ReactStars from "react-rating-stars-component";
import { convertIntoIndian, finalProductPrice } from "@/utils/formattedPrice";
import { useAddToCartMutation } from "@/features/api/cart.api";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { incrementCartCount } from "@/features/auth/auth.slice";

function ProductItem({ productData }) {
  const { name, price, images, stock, discountPercent, _id } = productData;
  const [addToCart, { isLoading, error }] = useAddToCartMutation();
  const { toast } = useToast();
  const dispatch=useDispatch();
  const handleAdd = (id) => {
    addToCart({ productId: id, quantity: 1 })
      .then((res) => {
        dispatch(incrementCartCount())
        toast({
          title: "Added to cart",
          description: `${name} has been added to your cart`,
        });
      })
      .catch((err) => {
        toast({
          title: "Failed to add to cart",
          description: err?.data?.error || "Something went wrong.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="h-max-content  flex flex-col justify-between  bg-white rounded-lg shadow-md cursor-pointer">
      <img
        src={images[0] || "./laptop-placerholder.png"}
        alt={name}
        className="w-full h-[150px] object-contain rounded-t-lg "
      />
      <div className="py-4 mt-4 px-4 text-center">
        <div className="text-left ">
          <h3 className="text-sm mb-1  font-semibold line-clamp-2">{name}</h3>
        </div>
        <div className="flex items-center justify-between w-full gap-2 mt-2">
          <h4 className="font-medium text-background text-sm ">
            ₹ {convertIntoIndian(finalProductPrice(price, discountPercent))}
          </h4>
          <div>
            <ReactStars
              count={5}
              value={4}
              size={24}
              edit={false}
              activeColor="#ffd700"
            />
          </div>
        </div>
        <div>
          <Button
            variant={"outline"}
            disabled={stock <= 0 || isLoading}
            className="w-full mt-4 "
            onClick={() => handleAdd(_id)}
          >
            {isLoading
              ? "Adding..."
              : stock > 0
              ? "Add to cart"
              : "Out of stock"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
