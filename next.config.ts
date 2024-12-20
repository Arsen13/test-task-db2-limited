import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '25mb',
    }
  },
  async headers() {
    return [
      {
        source: "/api/:path*", 
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://test-task-db2-limited.vercel.app/" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      },
      {
        // Додаємо заголовок CSP для дозволу завантаження скриптів з Clerk
        source: "/:path*",  // Цей заголовок буде застосовуватись до всіх шляхів
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' https://clerk.accounts.dev https://cdn.clerk.com; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;`
          }
        ]
      }
    ]
  }
};

export default nextConfig;
