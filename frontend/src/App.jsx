// import Navbar from "./components/Navbar";
import AllRoutes from "./routes/AllRoutes";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { validateToken } from "./features/auth/auth.slice";
import { store } from "./store";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    console.log("redering");
    dispatch(validateToken());
  }, [dispatch]);
  const data = useSelector((store) => store.auth);

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <AllRoutes />
      {!hideNavbar && <Footer />}
    </div>
  );
}

export default App;
