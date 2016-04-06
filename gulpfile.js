var gulp = require('gulp');
var babel = require('babel');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var browserify = require('browserify');

var paths = {
    scripts: ['js/*.js']
};

// Not all tasks need to use streams 
// A gulpfile is just another node program and you can use any package available on npm 
gulp.task('clean', function() {
    // You can use multiple globbing patterns as you would with `gulp.src` 
    return del(['build']);
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
});

gulp.task('browserify', [], function() {
    return browserify(paths.scripts)
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dist/'));
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['clean','browserify', 'scripts']);