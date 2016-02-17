module.exports = {
  use: [
    'autoprefixer',
    'cssnano'
  ],
  cssnano: {
    'discardComments': {
      'removeAll': true
    }
  }
};
