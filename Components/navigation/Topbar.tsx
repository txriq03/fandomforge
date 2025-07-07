"use client";
import SearchBox from "../SearchBox";
import Notifications from "../Notifications";

const Topbar = ({ user }: any) => {
  return (
    <div className=" w-full  lg:px-4 lg:pt-2">
      <div className="bg-sidebar py-2 px-2 lg:rounded-xl flex justify-between gap-4 outline-1 outline-indigo-500/15">
        <SearchBox />
        <Notifications />
      </div>
    </div>
  );
};

export default Topbar;
