/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: 'vercel',
  ignoredRouteFiles: ['**/.*'],
  serverDependenciesToBundle: ['nanoid'],
  server: process.env.NODE_ENV === 'development' ? undefined : './server.js',
};
