import { Link } from "@heroui/link";
import React from "react";

const Footer = () => {
  const githubLink = "https://github.com/txriq03";
  const portfolio = "https://tariqbrown.dev";
  return (
    <footer className="w-full bg-black/20 text-center py-5 text-sm mt-10 flex flex-col gap-1 items-center">
      <p>Developed with ❤️ and ☕</p>
      <div className="inline">
        <span className="text-white/75">by</span>{" "}
        <Link href={portfolio} target="_blank">
          Tariq
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
