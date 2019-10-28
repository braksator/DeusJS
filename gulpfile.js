'use strict';
 
var gulp = require('gulp');
var terser = require('gulp-terser');
var rename = require("gulp-rename");
var eslint = require('gulp-eslint');
var footer = require('gulp-footer');

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
    .pipe(footer('export default deusInstance;'))
    .pipe(terser({
        ecma: 7,
        mangle: {
          toplevel: true,
        },
      }))
    .pipe(rename("deusjs.mjs"))
    .pipe(gulp.dest('./')) 

    &&

    gulp.src('./src.js')
      .pipe(footer('module.exports = deusInstance;'))
      .pipe(terser({
          ecma: 7,
          mangle: {
            toplevel: true,
          },
        }))
      .pipe(rename("deusjs.cjs"))
      .pipe(gulp.dest('./'));
});