import {
  BadgeIndianRupee,

  History,
  Star,
  Truck,
  Wallet,
} from "lucide-react";


function QualityItem({icon,title,subTitle}) {
  return (
    <div className="text-center py-6 px-2 shadow-custom">
      {icon == "truck" && (
        <Truck
          fill="hsl(221.2 83.2% 53.3%)"
          size={40}
          className="mx-auto -mt-12 text-primary"
        />
      )}
      {icon == "star" && (
        <Star
          fill="hsl(221.2 83.2% 53.3%)"
          size={40}
          className="mx-auto -mt-12 text-primary"
        />
      )}
      {icon == "clock" && (
        <History size={40} className="mx-auto -mt-12 text-primary" />
      )}
      {icon == "price" && (
        <BadgeIndianRupee size={40} className="mx-auto -mt-12 text-primary" />
      )}
      {icon == "payment" && (
        <Wallet size={40} className="mx-auto -mt-12 text-primary" />
      )}
      <h1 className="font-bold">{title}</h1>
      <span className="text-sm text-muted-foreground">{subTitle}</span>
    </div>
  );
}

export default QualityItem;
