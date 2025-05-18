
import { ChevronDown, Mail, Navigation, Phone } from "lucide-react";

function TopNavbar() {
  return (
    <div className="h-4 w-screen bg-primary py-6 text-sm text-primary-foreground">
      <div className="container h-full custom_center justify-between">
        <div className="custom_center gap-6">
          <div className="flex gap-2 items-center">
            <Phone size={"20px"} color="white" />
            <p>+91 9516803962</p>
          </div>
          <div className="flex gap-2 items-center">
            <Mail size={"20px"} color="white" />
            <p>bkgstore@gmail.com</p>
          </div>
        </div>
        <div className="custom_center gap-6">
          <div className="flex gap-2 items-center">
            <Navigation size={"20px"} color="white" />
            <p>Douriya</p>
          </div>
          <div className="flex gap-2 items-center">
            <p>En</p>
            <ChevronDown size={"20px"} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
