var gulp = require('gulp');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var csscomb = require('gulp-csscomb');
var cssmin = require('gulp-csso');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var react = require('gulp-reactify');
var reactTools = require('react-tools');

var paths = {
    scripts: 'src/js/common.js',
    styles: ['src/stylus/*.styl', 'src/stylus/**/*.styl'],
    jsx: ['src/jsx/**/*.jsx']
};

gulp.task('uglify', function () {
    return gulp.src(paths.scripts)
        .pipe(uglify({mangle: true, compress: true}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./assets/js'))
        .pipe(livereload());
});

gulp.task('stylus', function () {
    return gulp.src('./src/stylus/style.styl')
        .pipe(stylus())
        .pipe(csscomb())
        .pipe(gulp.dest('./assets/css'))
        .pipe(cssmin())
        .pipe(rename({
            basename: 'style',
            suffix: '.min',
            ext: '.css'
        }))
        .pipe(gulp.dest('./assets/css'))
        .pipe(livereload());
});

gulp.task('react', function () {
    return gulp.src(paths.jsx)
        .pipe(react({reactTools: reactTools}))
        .pipe(gulp.dest('./assets/components'))
        .pipe(livereload());
});

gulp.task('watch', function () {
    var server = livereload();
    gulp.watch('./*.html').on('change', function (file) {
        server.changed(file.path);
    });
    gulp.watch(paths.scripts, ['uglify']);
    gulp.watch(paths.styles, ['stylus']);
    gulp.watch(paths.jsx, ['react']);
});

gulp.task('default', ['watch', 'react', 'uglify', 'stylus']);
