import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
//Установленные
import csso from 'postcss-csso'; //минифицирует css
import rename from 'gulp-rename'; //переименовывает
import htmlmin from 'gulp-htmlmin'; //минифицирует html
import terser from 'gulp-terser'; //минифицирует js
import squoosh from 'gulp-libsquoosh'; //оптимизирует изображения
import svgo from 'gulp-svgmin'; //оптимизирует svg
import svgstore from 'gulp-svgstore'; //создает спрайты
import { stacksvg } from "gulp-stacksvg";


//МИНИФИКАЦИЯ
// Стили
const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML
const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
}

// Скрипты
const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/js'))
}


// ИЗОБРАЖЕНИЯ
//копирует картинки без оптимизации
const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(gulp.dest('build/img'))
}

//оптимизирует картинки
const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

//создает WebP
export const createWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build/img'));
}

//SVG
export const svg = () => {
  return gulp.src(['source/img/**/*.svg', '!source/img/icon/sprite/*.svg', '!source/img/icon/stack/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));
}

//Создает спрайты
export const sprite = () => {
  return gulp.src('source/img/icon/sprite/*.svg')
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
}

//Создает стеки
const { src, dest } = gulp;
export const createStack = () => {
  return src('source/img/icon/stack/*.svg')
    .pipe(svgo())
    .pipe(stacksvg())
    .pipe(dest('build/img'))
}

//Копирует файлы
export const copy = (done) => {
  gulp.src([
    'source/fonts/**/*.{woff2, woff}',
    'source/*.ico',
    'source/*.webmanifest'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest("build"))
  done();
}

// Server
const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}


export default gulp.series(
  html, styles, scripts, copyImages, server, watcher
);
