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
