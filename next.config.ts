import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://image.tmdb.org/**")],
  },
  async redirects() {
    return [
      {
        source: "/browse",
        destination: "/browse/movie",
        permanent: true, // or false if it's a temporary redirect
      },
    ];
  },
};

export default nextConfig;
