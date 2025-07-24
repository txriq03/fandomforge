import { IconType } from "react-icons";
import { FaHouseChimney } from "react-icons/fa6";
import {
  TbBookmarksFilled,
  TbBrandSafari,
  TbCompass,
  TbDeviceTvFilled,
  TbHistory,
  TbMovie,
} from "react-icons/tb";

export type navItem = {
  name: string;
  icon: IconType;
  href: string;
};

export const navItems: navItem[] = [
  { name: "Home", icon: FaHouseChimney, href: "/" },
  // { name: "Movies", icon: TbMovie, href: "/movie" },
  // { name: "TV Shows", icon: TbDeviceTvFilled, href: "/tv" },
  { name: "Browse", icon: TbBrandSafari, href: "/browse" },
  { name: "History", icon: TbHistory, href: "/history" },
  { name: "Saved", icon: TbBookmarksFilled, href: "/bookmarks" },
];
