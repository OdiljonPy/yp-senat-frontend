import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: { unoptimized: true, domains: ["images.unsplash.com"] },
};

export default withNextIntl(nextConfig);