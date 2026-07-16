import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/parallel-lives',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
