/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "s3-inventory710.s3.eu-west-2.amazonaws.com",
          port: "",
          pathname: "/**",
        },
      ],
    },
  };
  

export default nextConfig;
