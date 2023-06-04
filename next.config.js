/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/booking',
        permanent: true,
      },
      {
        source: '/auth/logout',
        destination: '/auth/login',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/auth/login',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/professional/register',
        destination: '/auth/register/professionals',
      },
      {
        source: '/api/patient/register',
        destination: '/auth/register/patients',
      },
    ];
  },
};

module.exports = nextConfig;
