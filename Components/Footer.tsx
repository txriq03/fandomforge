import { Link } from "@heroui/link";
import React from "react";

const Footer = () => {
  const githubLink = "https://github.com/txriq03";
  const portfolio = "https://tariqbrown.dev";
  return (
    <footer className="w-full bg-black/20 text-center py-5 text-sm mt-10 flex flex-col gap-1 items-center relative">
      <p>Developed with ❤️ and ☕</p>
      <div className="inline">
        <span className="text-white/75">by</span>{" "}
        <Link href={portfolio} target="_blank">
          Tariq
        </Link>
      </div>

      <div
        className="absolute inset-0 z-0 bg-black/10"
        style={{
          backgroundImage: `
        radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
      `,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0",
        }}
      />
    </footer>
  );
};

export default Footer;
