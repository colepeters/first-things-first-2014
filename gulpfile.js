var gulp = require('gulp')
var cssnext = require('cssnext')
var del = require('del')
var hb = require('gulp-hb')
var postcss = require('gulp-postcss')
var rename = require('gulp-rename')
var uncss = require('gulp-uncss')
var webserver = require('gulp-webserver')

gulp.task('clean', function () {
  del.sync(['public/**'])
})

gulp.task('templates', function () {
  return gulp.src('src/templates/*.hbs')
    .pipe(hb({
      data: 'src/js/members.json',
      partials: 'src/templates/partials/**/*.hbs',
      bustCache: true
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('public'))
})

gulp.task('styles', function () {
  var processors = [
    cssnext({
      compress: true
    })
  ]

  return gulp.src('src/css/app.css')
    .pipe(postcss(processors))
    .pipe(uncss({
      html: ['public/*.html'],
      ignore: ['.a-signatories.is-truncated']
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/css'))
})

gulp.task('scripts', function () {
  return gulp.src('src/js/app.js')
    .pipe(gulp.dest('public/js'))
})

gulp.task('watch', ['templates', 'styles'], function () {
  gulp.watch('src/css/**/*', ['styles'])
  gulp.watch('src/js/**/*.js', ['scripts'])
  gulp.watch('src/templates/**/*', ['templates'])
})

gulp.task('serve', ['clean', 'templates', 'styles', 'scripts', 'watch'], function () {
  return gulp.src('public')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: false,
      host: 'localhost',
      port: 9090
    }))
})

gulp.task('build', ['clean', 'templates', 'styles', 'scripts'])
