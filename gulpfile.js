var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var autoprefixer = require('gulp-autoprefixer');
 
var paths = {
  scripts: ['public/raw/js/*.js'],
  styles: ['public/raw/styles/*.*']
};

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts) 
  // with sourcemaps all the way down 
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'));
});

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    // .pipe(gulp.dest('public/min/css'))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    //.pipe(sourcemaps.init())
      .pipe(concat('styles.css'))
    .pipe(gulp.dest('public/css'));
});


// Rerun the task when a file changes 
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('launch', function () {
  nodemon({
    script: 'bin/www'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
})
 
// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'scripts', 'styles', 'launch']);
