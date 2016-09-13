const gulp = require('gulp');
const browsersync = require('browser-sync');
const mainBowerFiles = require('main-bower-files');
const $ = require('gulp-load-plugins')({camelize: true});

const sassLintOptions = {options: {configFile: './.sass-lint.yml'}};
const autoprefixerOptions = {browsers: ['last 2 versions'], cascade: false};
const cleanCssOptions = {compatibility: 'ie8', keepSpecialComments: 0};

gulp.task('templates', function() {
  return gulp.src(['./src/views/**/*.pug', '!./src/views/**/_*.pug'])
    .pipe($.plumber())
    .pipe($.data(require('./src/data/index.js')))
    .pipe($.pug({pretty: true}))
    .pipe(gulp.dest('./dist'))
    .pipe(browsersync.stream());
});

gulp.task('styles', function() {
  return gulp.src(['./src/styles/**/*.sass'])
    .pipe($.sourcemaps.init())
    .pipe($.plumber())
    .pipe($.sassLint(sassLintOptions))
    .pipe($.sassLint.format())
    .pipe($.sass({indentedSyntax: true}))
    .pipe($.autoprefixer(autoprefixerOptions))
    .pipe($.concat('styles.css'))
    .pipe($.cleanCss(cleanCssOptions))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browsersync.stream());
});

gulp.task('styles:bower', function() {
  return gulp.src(mainBowerFiles({filter: '**/*.css'}))
    .pipe($.concat('vendor.css'))
    .pipe($.cleanCss(cleanCssOptions))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browsersync.stream());
});

gulp.task('scripts', function () {
  return gulp.src(['./src/scripts/**/*.js'])
    .pipe($.sourcemaps.init())
    .pipe($.plumber())
    .pipe($.babel({presets: ['es2015']}))
    .pipe($.uglify())
    .pipe($.concat('main.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browsersync.stream());
});

gulp.task('scripts:bower', function() {
  return gulp.src(mainBowerFiles({filter: '**/*.js'}))
    .pipe($.concat('vendor.js'))
    .pipe($.uglify())
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

gulp.task('bower', ['styles:bower', 'scripts:bower']);

gulp.task('build', ['bower', 'styles', 'scripts', 'templates']);

gulp.task('serve', ['build', 'watch']);

gulp.task('default', ['build']);
