

function ProductBanner() {
  return (
    <div className="flex items-center justify-between px-10 rounded-lg bg-blue h-[300px] bg-gradient-to-r from-[#EDEADE] to-white">
      <div className="w-1/2">
        <h1 className="text-4xl font-semibold ">
          Laptop and Computer Category
        </h1>
        {/* <p className="text-teal mt-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
         
        </p> */}
      </div>
      <div className="w-1/2 p-20">
        <img src="/laptop.webp" alt="laptop" />
      </div>
    </div>
  );
}

export default ProductBanner;
