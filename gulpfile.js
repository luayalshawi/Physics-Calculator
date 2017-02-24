var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var notifier = require('node-notifier');
var server = require('gulp-server-livereload');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var uglify = require('gulp-uglifyjs');
var babel = require('babelify');
var envify = require('envify/custom')
var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  console.log(error);

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }
  console.log(message);
  notifier.notify({title: title, message: message});
};


var bundler = watchify(browserify({
  entries: ['./src/app.jsx'],
  // transform: [reactify],
  extensions: ['.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}).transform("babelify", {presets: ["es2015", "react"]})//.transform(envify(env))
);


function bundle() {
  return bundler
    .bundle()
    .on('error', notify)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./'))
}
bundler.on('update', bundle);

gulp.task('build', function() {
  bundle()
});

gulp.task('serve', function(done) {
  gulp.src('')
    .pipe(server({
      fallback: './index.html',
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          if(/main.js/.test(filePath)) {
            cb(true)
          } else if(/style.css/.test(filePath)){
            cb(true)
          }
        }
      },
      open: true
    }));
});


gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./'));
});
gulp.task('production',function() {
  process.env.NODE_ENV = 'production';
})
gulp.task('uglify', function() {
  gulp.src('./main.js')
    .pipe(uglify().on("error", function(error){console.log(error);}))
    .pipe(gulp.dest('./'))
});

gulp.task('default', ['build', 'serve','sass', 'watch']);
gulp.task('p', ['production','build', 'serve','sass', 'watch']);
gulp.task('min', ['uglify']);

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
