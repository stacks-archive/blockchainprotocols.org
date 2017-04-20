'use strict';

import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dev', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = false;
  
  process.env.NODE_ENV = 'test';

  // Run all tasks once
  return runSequence([
    'sass', 'imagemin', 'browserify', 'copyFonts',
    'copyIndex', 'copyIcons', 'copyStyles'
  ], 'watch', cb);

});