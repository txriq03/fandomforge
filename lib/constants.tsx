import { IconType } from "react-icons";
import { FaHouseChimney } from "react-icons/fa6";
import { TbBookmarksFilled, TbBrandSafari } from "react-icons/tb";

import { JSX } from "react";

export type StatusOption = {
  name: string;
  icon: JSX.Element;
};

const statusOptions: StatusOption[] = [
  { name: "Online", icon: <div className="w-3 h-3 bg-success rounded-full" /> },
  { name: "Idle", icon: <div className="w-3 h-3 bg-warning rounded-full" /> },
  {
    name: "Do Not Disturb",
    icon: <div className="w-3 h-3 bg-danger rounded-full" />,
  },
  {
    name: "Invisible",
    icon: <div className="w-3 h-3 bg-default rounded-full" />,
  },
];

export default statusOptions;

export type navItem = {
  name: string;
  icon: IconType;
  href: string;
};

export const navItems: navItem[] = [
  { name: "Home", icon: FaHouseChimney, href: "/" },
  { name: "Browse", icon: TbBrandSafari, href: "/browse" },
  { name: "Saved", icon: TbBookmarksFilled, href: "/bookmarks" },
];

export const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
