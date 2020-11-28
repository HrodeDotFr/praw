const gulp = require('gulp');
const rimraf = require('gulp-rimraf');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-clean-css');

function clean() {
    return gulp.src("dist/*", {read: false}).pipe(rimraf());
}

function styles() {
    return gulp.src('src/scss/*.scss')
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(concat('praw.min.css'))
            .pipe(minifyCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest('dist/css'));
}

function scripts() {
    return gulp.src('src/js/**/*.js')
            .pipe(babel({presets: ['minify']}))
            .pipe(concat('praw.min.js'))
            .pipe(gulp.dest('dist/js'));
}

function fonts() {
    return gulp.src('src/fonts/*')
            .pipe(gulp.dest('dist/fonts'));
}

var build = gulp.series(clean, gulp.parallel(styles, scripts, fonts));

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.fonts = fonts;
exports.build = build;

exports.default = build;
