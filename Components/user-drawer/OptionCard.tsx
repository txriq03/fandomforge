import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconType } from "react-icons";

interface OptionCardProps {
  name: string;
  Icon: IconType;
  className?: string;
  href?: string;
}

const OptionCard = ({name, Icon, className, href}: OptionCardProps) => {
  return (
    <Link href={href ?? ''} onClick={() => console.log("Option clicked!")} className={cn('cursor-pointer p-2  rounded-lg flex flex-col items-center justify-center gap-1 border-1 border-white/10 hover:bg-white/7 hover:text-foreground/100 duration-200 transition-all h-[100px] text-white/50', className)}>
      <Icon size={24}/>
      <p>{name}</p>
    </Link>
  )
}

export default OptionCard;
