/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*{/}?',
  //       headers: [
  //         {
  //           key: 'X-Accel-Buffering',
  //           value: 'no',
  //         },
  //       ],
  //     },
  //   ]
  // },output: "standalone",
  // env: {
  //   NEXT_PUBLIC_SUPABASE_URL: process.env.SUPABASE_URL,
  //   NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  // },
  output: "standalone",
  // experimental: {
  //   serverActions: {
  //     bodySizeLimit: '5mb',
  //   },
  // },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ]
  },
}