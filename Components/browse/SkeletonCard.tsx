import { cn } from "@/lib/utils";
import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

const SkeletonCard = ({ className }: { className?: string }) => {
  return (
    <Card
      className={cn("w-full aspect-[2/3] p-2 bg-neutral-900", className)}
      radius="md"
    >
      <Skeleton className=" rounded-md lg:rounded-lg mb-3">
        <div className="w-full aspect-[1/1] rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-2">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-2 sm:h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-2 sm:h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-2 sm:h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
  );
};

export default SkeletonCard;
