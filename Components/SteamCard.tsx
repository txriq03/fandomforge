const SteamCard = ({ url }: { url?: string }) => {
  return (
    <div className="w-full  perspective-[1000px] perspective-origin-top h-[max-content] ">
      <div className="group relative  overflow-hidden origin-[100%_0] shadow-[0px 10px 39px 10px rgba(62, 66, 66, 0.22)] rounded-[2px] transition-[transform] duration-[0.3s] ease-in-out hover:rotate-x-[10deg]">
        <img src={url} className="w-full" />
        <div className="absolute content-[''] top-0 left-0 z-1  origin-top-right w-[200%] h-[65%] opacity-[0.5] transition-all duration-[0.3s] ease-in-out bg-[linear-gradient(35deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.07)_51.5%,rgba(255,255,255,0.15)_54%,rgba(255,255,255,0.15)_100%)] group-hover:h-[120%] group-hover:opacity-70" />
      </div>
    </div>
  );
};

export default SteamCard;
