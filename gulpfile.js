'use strict';
 
var gulp = require('gulp');
var terser = require('gulp-terser');
var rename = require("gulp-rename");
  
gulp.task('deus', function () {
  return gulp.src('./src.js')
    .pipe(terser({
        ecma: 6,
        warnings: 'verbose',
        module: true,
        toplevel: true,
      }))
    .pipe(rename("deus.js"))
    .pipe(gulp.dest('./'));
});