/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "mathieudev.vercel.app" }],
        destination: "https://www.mathieudev.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
