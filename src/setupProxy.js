const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://172.24.3.70:8443',
      changeOrigin: true,
      ws: true,
      secure: false,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
};
