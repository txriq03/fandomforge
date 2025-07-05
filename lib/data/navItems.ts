import { Clapperboard, History, House, LucideProps, Tv } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type navItem = {
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  href: string;
};

export const navItems: navItem[] = [
  { name: "Home", icon: House, href: "/" },
  { name: "Movies", icon: Clapperboard, href: "/movies" },
  { name: "TV Shows", icon: Tv, href: "/tv" },
  { name: "History", icon: History, href: "/history" },
];
