"use client";

import { useMediaQuery } from "usehooks-ts";
import ProfileDrawer from "./ProfileDrawer";
import ProfileModal from "./ProfileModal";

const ProfileWrapper = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return isMobile ? <ProfileDrawer /> : <ProfileModal />;
};

export default ProfileWrapper;
