/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false,
  },
  async redirects() {
    return [
      {
        source: '/stories',
        destination: '/journal',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
