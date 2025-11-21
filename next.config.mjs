/** @type {import('next').NextConfig} */

const nextConfig = {
  // Enable static export for Netlify
  output: 'export',

  // Enable SWC minification
  swcMinify: true,

  // Enable React strict mode for development
  reactStrictMode: true,

  // Image optimization - disable for static export
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Three.js support
  transpilePackages: ["three"],

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version || '0.0.0',
  },

  // Custom headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Content Type Protection
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Clickjacking Protection
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // XSS Protection (legacy, but still useful)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // HTTPS Only (Strict Transport Security)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // Referrer Policy - Privacy & Security
          {
            key: 'Referrer-Policy',
            value: 'no-referrer',
          },
          // Content Security Policy - Prevents XSS, Injection Attacks
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; connect-src 'self' https://api.web3forms.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
          },
          // Permissions Policy - Control Browser Features
          {
            key: 'Permissions-Policy',
            value: 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), microphone=()',
          },
          // Cross Domain Policy
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none',
          },
        ],
      },
    ];
  },

};

export default nextConfig;
