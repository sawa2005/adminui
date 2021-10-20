const gulp = require("gulp");
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const { src, dest, series, watch, task } = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync').create();

// File directories
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/css/*.css",
    sassPath: "src/styles/*.scss",
    jsPath: "src/scripts/*.js",
    babelPath: "src/babel/*.js",
    imgPath: "src/images/*"
}

// SASS-task
function sassTask() {
    return src(files.sassPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('src/css')
    );
}

// HTML-task / Kopierar HTML-filerna
function copyHTML() {
    return src(files.htmlPath)
    .pipe(dest('pub'));
}

// CSS-task / Kopierar, konkatenerar och minimerar CSS-filerna
function cssTask() {
    return src(files.cssPath)
    .pipe(concat('main.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(dest('pub/styles'));
}

// Babel-task / Gör JavaScript-kod kompatibel med "alla" webbläsare
function babelTask() {
    return src(files.jsPath)
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(dest('src/babel'));
}

// JS-task / Kopierar, konkatenerar och minimerar JS-filerna
function jsTask() {
    return src(files.babelPath)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest('pub/scripts'));
}

// Image-task / Kopierar bildfilerna
function imgTask() {
    return src(files.imgPath)
    .pipe(dest('pub/images'));
}

// Browsersync / Ger webbsidan en livereload-funktion
function browsersyncServer(cb) {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });
    cb();
}

function browsersyncReload(cb) {
    browserSync.reload();
    cb();
}

// Watch Task / Ser till att rätt task körs om någon fil ändras
function watchTask(){
    watch(files.htmlPath, browsersyncReload);
    watch([files.sassPath, files.jsPath], browsersyncReload);
    watch(files.htmlPath, copyHTML);
    watch(files.sassPath, sassTask);
    watch(files.jsPath, babelTask);
    watch(files.babelPath, jsTask);
    watch(files.cssPath, cssTask);
    watch(files.imgPath, imgTask);
}

// Exporterar alla tasks
exports.default = series(
    copyHTML,
    babelTask, 
    jsTask, 
    imgTask,
    sassTask,
    cssTask,
    browsersyncServer, 
    browsersyncReload, 
    watchTask);