import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const Padding = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={cn("px-4 sm:px-10", className)}>{children}</div>;
};

export default Padding;
