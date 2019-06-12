const gulp = require('gulp');
const sass = require('gulp-sass');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const log = require('gulplog');
const babelify = require('babelify');
const watchify = require('watchify');
const del = require('del');
const cssnano = require('cssnano');
const useref = require('gulp-useref');
const postcss = require('gulp-postcss');
const gulpif = require('gulp-if');
const server = require('browser-sync').create();

const paths = {
  html: {
    src: 'src/*.html',
    buildDest: 'build'
  },
  sass: {
    src: 'src/sass/**/*.scss',
    dest: 'src/css'
  },
  scripts: {
    src: 'src/js/index.js',
    dest: 'src/js/dist',
    buildDest: 'build/js/dist'
  },
  fonts: {
    src: 'src/fonts/**/*',
    builDest: 'build/fonts'
  }
};

const bundlerOptions = {
  ...watchify.args,
  entries: [paths.scripts.src],
  transform: [
    babelify.configure({
      presets: ['@babel/preset-env', '@babel/preset-react']
    })
  ]
};

const bundler = watchify(browserify(bundlerOptions));

bundler.on('update', makeDevBundle);

//// dev functions
function makeDevBundle() {
  return bundler
    .bundle()
    .on('error', log.error)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(server.stream({ once: true }));
}

function initServer(done) {
  server.init({
    server: {
      baseDir: 'src'
    }
  });
  done();
}

function reloadServer(done) {
  server.reload();
  done();
}

function compileSass() {
  return gulp
    .src(paths.sass.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.sass.dest));
}

function watch() {
  gulp.watch(paths.sass.src, gulp.series(compileSass, reloadServer));
  gulp.watch(paths.html.src, { events: 'change' }, reloadServer);
}

//// build functions
function makeBuildBundle() {
  return bundler
    .bundle()
    .on('error', log.error)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .on('error', log.error)
    .pipe(gulp.dest(paths.scripts.buildDest))
    .pipe(server.stream({ once: true }));
}

function clean() {
  return del('build');
}

function fonts(done) {
  gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.builDest));
  done();
}

function buildCss() {
  const plugins = [cssnano()];
  return gulp
    .src(paths.html.src)
    .pipe(useref())
    .pipe(gulpif('*.css', postcss(plugins)))
    .pipe(gulp.dest(paths.html.buildDest));
}

function initBuildServer(done) {
  server.init({
    server: {
      baseDir: 'build'
    }
  });
  done();
}

exports.default = gulp.series(compileSass, makeDevBundle, initServer, watch);
exports.build = gulp.series(clean, compileSass, buildCss, fonts, makeBuildBundle);

//solo para probar el desempeño
exports.buildAndTest = gulp.series(
  clean,
  compileSass,
  buildCss,
  fonts,
  makeBuildBundle,
  initBuildServer
);
