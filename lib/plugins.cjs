module.exports = [
  require('imagemin-pngquant')({
    quality: [0.5, 1.0]
  }),
  require('imagemin-mozjpeg')({
    quality: 85,
    progressive: true
  }),
  require('imagemin-gifsicle')(),
  require('imagemin-svgo')({
    plugins: [
      { name: 'removeViewBox', active: false }
    ]
  }),
  require('imagemin-webp')({
    quality: 75,
    lossless: true
  })
]
