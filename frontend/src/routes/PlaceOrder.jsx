import SmallOrderDesc from "@/components/miscellaneous/SmallOrderDesc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";


function PlaceOrder() {
  return (
    <div className="container mt-10 flex w-full gap-8">
      <div className="flex-grow ">
        <h1 className="text-lg  font-semibold">Shipping Details</h1>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <Label>First Name</Label>
            <Input type="text" name="firstname" />
          </div>
          <div>
            <Label>Last Name</Label>
            <Input type="text" name="lastname" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" name="email" />
          </div>
          <div>
            <Label>Mobile No</Label>
            <Input type="text" name="mobile" />
          </div>
          <div>
            <Label>Address</Label>
            <Input type="text" name="address" />
          </div>
          <div>
            <Label>Country</Label>
            <Input type="text" name="country" />
          </div>
          <div>
            <Label>Pincode</Label>
            <Input type="text" name="pincode" />
          </div>
          <div>
            <Label>Town/City</Label>
            <Input type="text" name="town" />
          </div>
        </div>
      </div>
      <div className="w-1/3 shadow-custom p-4 rounded-md">
        <h1 className="text-lg  font-semibold">My Orders</h1>
        <SmallOrderDesc quan={"1"} name={"Hp Pavillion"} price={"1999"} />
        <SmallOrderDesc quan={"1"} name={"Hp Pavillion"} price={"1999"} />
        <SmallOrderDesc quan={"1"} name={"Hp Pavillion"} price={"1999"} />
        <hr className="my-6" />
        <SmallOrderDesc name={"Subtotal"} price={"1999"} />
        <SmallOrderDesc name={"shipping"} price={"40"} />
        <SmallOrderDesc name={"Tax"} price={"20"} />
        <hr className="my-6" />
        <div className="flex items-center justify-between mt-2.5">
          <p className="font-semibold">Order Total</p>
          <h2 className="font-semibold text-background text-lg">₹ 2139 </h2>
        </div>
        <div className="flex items-center gap-2">
          <input className="size-3.5 cursor-pointer" type="checkbox" />
          <p className="text-sm">Cash On Delivery</p>
        </div>
        <Button className="w-full my-6">Place Order</Button>
      </div>
    </div>
  );
}

export default PlaceOrder;
