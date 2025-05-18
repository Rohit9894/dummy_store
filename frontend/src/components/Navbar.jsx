import TopNavbar from "./TopNavbar";
import Logo from "./miscellaneous/Logo";
import { Input } from "./ui/input";
import { Search, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/button";
import Category from "./Category";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "@/features/product/product.api";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { fetchProducts } from "@/features/product/product.slice";
// import { useSelector, useDispatch } from "react-redux";

function Navbar() {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const [isScrolled, setIsScrolled] = useState(false);

  const {
    data: searchData,
    isLoading,
    error,
  } = useGetProductsQuery(
    {
      page: 1,
      limit: 10,
      search: debouncedSearch,
    },
    {
      skip: debouncedSearch.trim() === "",
    }
  );
  function handleBlur() {
    setSearch("");
    setShowDropdown(false);
  }
  const { cartCount } = useSelector((store) => store.auth);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navClasses = `sticky top-0 z-50 w-full transition-all ${
    isScrolled ? "bg-white shadow-sm" : "bg-white md:bg-transparent"
  }`;

  return (
    <>
      <header className={navClasses}>
        {/*Top Navbar*/}
        <div className="hidden">
          <TopNavbar />
        </div>
        {/* Navbar */}
        <div className="container h-20 leading-[80px]">
          <div className="  custom_center justify-between">
            <Link to="/">
              <Logo />
            </Link>
            {/* Search bar */}
            <div
              id="search-container"
              className="relative md:block w-1/2   mx-auto"
            >
              <div className="hidden md:block w-full relative">
                <Input
                  type="text"
                  placeholder="Search here..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={handleBlur}
                  className="full pl-4 bg-secondary"
                />
                <Search
                  size={"20px"}
                  strokeWidth={3}
                  className="absolute right-4 top-2 text-primary"
                />
              </div>
              {/* search results drop down */}

              {showDropdown && debouncedSearch && (
                <div className="absolute bg-white border w-full z-10 max-h-60 overflow-y-auto shadow-md ">
                  {isLoading ? (
                    <p className="p-2">Loading...</p>
                  ) : searchData?.data?.length ? (
                    searchData.data.map((item) => (
                      <div
                        key={item.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer custom_center gap-4"
                        onClick={() => {
                          setSearch(item.name);
                          setShowDropdown(false);
                        }}
                      >
                        {item?.images[0] ? (
                          <img
                            src={item.images[0]}
                            alt={item?.name}
                            className="h-8"
                          />
                        ) : (
                          <Search />
                        )}
                        <p>{item.name}</p>
                      </div>
                    ))
                  ) : (
                    <p className="p-2">No results found</p>
                  )}
                </div>
              )}
            </div>
            {/* cart */}
            <div className="custom_center gap-4">
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="text-primary" />
                  <span className="sr-only">Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute top-2 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-primary">
                  <User size="20px" className="mr-2" />
                  <span className="hidden md:block uppercase">My Account</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className=" md:hidden w-full mt-2 relative">
            <Input
              type="search"
              placeholder="Search here..."
              className="full pl-4 bg-input_bg"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search
              size={"20px"}
              strokeWidth={3}
              className="absolute right-4 top-2 text-primary "
            />
          </div>
        </div>
      </header>
      {/* Category */}
      <Category />
    </>
  );
}

export default Navbar;
