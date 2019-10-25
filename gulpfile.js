'use strict';
 
var gulp = require('gulp');
var terser = require('gulp-terser');
var rename = require("gulp-rename");
var eslint = require('gulp-eslint');

gulp.task('lint', () => {
  return gulp.src(['./src.js'])
      .pipe(eslint({
        "env": {
            "browser": true,
            "es6": true,
            "commonjs": true,
        },
        "rules":{
            "camelcase": 1,
            "comma-dangle": 2,
            "quotes": 0
        }
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('deus', function () {
  return gulp.src('./src.js')
    .pipe(terser({
        ecma: 7,
        mangle: {
          toplevel: true,
        },
      }))
    .pipe(rename("deus.js"))
    .pipe(gulp.dest('./'));
});