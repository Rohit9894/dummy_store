import { NavLink } from "react-router-dom";

function Category() {
  const category = [
    { id: 1, title: "All Categories", to: "/test" },
    { id: 2, title: "Accessories", to: "/test" },
    { id: 3, title: "Smartphone", to: "/test" },
    { id: 4, title: "Laptop", to: "/laptop" },
    { id: 5, title: "Earphone", to: "/test" },
    { id: 6, title: "Headphone", to: "/test" },
    { id: 7, title: "SIM", to: "/test" },
    { id: 8, title: "Bluetooth Speakers", to: "/test" },
  ];

  return (
    <div className="w-full mt-5 overflow-x-auto hide-scrollbar">
      <div className="flex space-x-3 px-4 sm:px-6 md:justify-between">
        {category.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            onClick={(e) => {
              if (item.to !== "/laptop") {
                e.preventDefault(); // ⛔ Prevent navigation
                alert("Navigation disabled for this link");
              }
            }}
            className={({ isActive }) =>
              `text-sm px-3 py-1 cursor-pointer rounded-lg whitespace-nowrap ${
                isActive
                  ? "text-muted bg-accent-foreground"
                  : "text-muted bg-muted-foreground"
              } hover:bg-accent-foreground`
            }
          >
            {item.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Category;
