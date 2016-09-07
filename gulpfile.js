const gulp = require('gulp');
const $ = require('gulp-load-plugins')({camelize: true});
const browsersync = require('browser-sync');

gulp.task('templates', function() {
  return gulp.src(['./src/views/**/*.pug', '!./src/views/**/_*.pug'])
    .pipe($.plumber())
    .pipe($.data(require('./src/data/data.js')))
    .pipe($.pug())
    .pipe(gulp.dest('./dist'))
    .pipe(browsersync.stream());
});

gulp.task('styles', function() {
  return gulp.src(['./src/styles/**/*.sass'])
    .pipe($.plumber())
    .pipe($.sassLint({options: {configFile: './.sass-lint.yml'}}))
    .pipe($.sassLint.format())
    .pipe($.sass({indentedSyntax: true}))
    .pipe($.autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browsersync.stream());
});

gulp.task('scripts', function () {
  return gulp.src(['./src/scripts/**/*.js'])
    .pipe($.plumber())
    .pipe($.babel({presets: ['es2015']}))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browsersync.stream());
});

gulp.task('watch', ['templates', 'styles', 'scripts'], function() {
  browsersync.init({
    server: {baseDir: './dist'}
  });

  gulp.watch(['./src/**/*.pug', './src/**/*.json'], ['templates']);
  gulp.watch(['./src/styles/**/*.sass'], ['styles']);
  gulp.watch(['./src/**/*.js'], ['scripts']);
  gulp.watch('./dist/**/*.{html,js}').on('change', browsersync.reload);

});

gulp.task('build', ['styles', 'scripts', 'templates']);

gulp.task('serve', ['build', 'watch']);

gulp.task('default', ['build']);
