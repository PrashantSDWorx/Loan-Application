module.exports = {
  '/api': {
    target: 'http://localhost:5158',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug'
  }
};
