/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // protocol: "https",
        hostname: "plus.unsplash.com",
        // port: "",
        // pathname: "/images/**",
      },
    ],
  }
};

export default nextConfig;
