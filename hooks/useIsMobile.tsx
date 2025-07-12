// hooks/useIsMobile.ts
import { useMediaQuery } from "usehooks-ts";

function useIsMobile() {
  return useMediaQuery("(max-width: 640px)");
}

export default useIsMobile;
