module.exports = {
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: "http://localhost:3200/api/:path*",
        },
        {
          source: "/",
          destination: "http://localhost:3200/",
        },
      ];
    }
  }
  
  