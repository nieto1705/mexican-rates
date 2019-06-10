const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const log = require('gulplog');
const babelify = require('babelify');
const watchify = require('watchify');
const del = require('del');

const server = require('browser-sync').create();

const paths = {
  html: {
    src: 'src/*.html'
  },
  scripts: {
    src: 'src/js/index.js'
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

function makeDevBundle() {
  return bundler
    .bundle()
    .on('error', log.error)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('src/js/dist'))
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

function watch() {
  gulp.watch(paths.html.src, { events: 'change' }, reloadServer);
}

exports.default = gulp.series(makeDevBundle, initServer, watch);
