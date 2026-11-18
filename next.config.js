const backend = process.env.PROTOOLS_BACKEND_URL;
if (!backend) console.warn("Set PROTOOLS_BACKEND_URL in Vercel project settings.");
module.exports = {
  async rewrites() {
    if (!backend) return [];
    const cleanBackend = backend.replace(/\/$/, "");
    return [{ source: "/api/:path*", destination: `${cleanBackend}/api/:path*` }];
  },
  poweredByHeader: false,
  reactStrictMode: true,
};
