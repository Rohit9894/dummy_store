import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function LaptopSkeleton() {
  return (
    <div className="flex flex-col space-y-3 shadow-mdp-4">
      <Skeleton className="h-[150px] w-full rounded-xl " />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export default LaptopSkeleton;
