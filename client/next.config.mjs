/* eslint-disable import/no-anonymous-default-export */
export default {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/api/:path*", // Proxy to Backend
      },
    ];
  },
};
