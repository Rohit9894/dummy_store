

const SmallOrderDesc = ({ quan="", name, price }) => {
  return (
    <div className="flex items-center justify-between mt-2.5">
      <p className="text-muted-foreground">
        {quan.length > 0 && <span className="text-black mr-2">{quan}x</span>}
        {name}
      </p>
      <p className="font-semibold">₹ {price}</p>
    </div>
  );
};

export default SmallOrderDesc;
