module.exports = {
  cwd: "./test/before/",
  // src: "./test/before/**/[!_]*.{jpg,png,gif,svg}",
  src: "**/[!_]*.{jpg,png,gif,svg}",
  dest: "./test/after/",

  webp: "\.(jpg|png)$",// NOTE: .gif not work

  // plugins: [
  //   require('imagemin-pngquant')({
  //     quality: [0.5, 1.0]
  //   }),
  //   require('imagemin-mozjpeg')({
  //     quality: 85,
  //     progressive: true
  //   }),
  //   require('imagemin-gifsicle')(),
  //   require('imagemin-svgo')({
  //     plugins: [
  //       { removeViewBox: false }
  //     ]
  //   }),
  //   require('imagemin-webp')({
  //     quality: 75,
  //     lossless: true
  //   })
  // ]
}

