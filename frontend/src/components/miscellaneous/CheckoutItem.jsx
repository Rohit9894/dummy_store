import { convertIntoIndian } from "@/utils/formattedPrice";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUpdateQuantityMutation } from "@/features/api/cart.api";
import { useDispatch } from "react-redux";
import {
  decrementCartCount,
  incrementCartCount,
} from "@/features/auth/auth.slice";

function CheckoutItem({ cartItem }) {
  const { name, images, price, _id } = cartItem?.productId;
  const dispatch = useDispatch();

  const [updateQuantity] = useUpdateQuantityMutation();

  const handleIncrement = () => {
    updateQuantity({ productId: _id, action: "inc" })
      .then((res) => {
        dispatch(incrementCartCount());
      })
      .catch((err) => console.log(err));
  };

  const handleDecrement = () => {
    updateQuantity({ productId: _id, action: "dec" })
      .then((res) => dispatch(decrementCartCount()))
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex p-2 shadow-custom rounded-md w-full ">
      <div className="custom_center gap-4 flex-shrink-0 size-20">
        <img
          src={images[0]}
          alt="image"
          className="size-w-full h-full object-contain rounded-md"
        />
      </div>
      <div className=" w-full ml-10 box-border">
        <Link className="font-medium hover:underline">{name}</Link>
        <div className="text-sm text-zinc-500">{"laptop"}</div>
        <div className="font-medium">{convertIntoIndian(price)}</div>
        <div className="flex  justify-end gap-2">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={handleDecrement}
            >
              -
            </Button>
            <Input
              type="number"
              min="1"
              value={cartItem?.quantity}
              // onChange={(e) =>
              //   updateQuantity(item.id, Number.parseInt(e.target.value) || 1)
              // }
              className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={handleIncrement}
            >
              +
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-zinc-500"
            // onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutItem;
