var gulp = require('gulp');

var jsonlint = require("gulp-jsonlint");
var gulpyaml = require('gulp-yaml');
var ext_replace = require('gulp-ext-replace');
var map = require('map-stream');
var YAML = require('json2yaml');
var gutil = require('gulp-util');

var exitCode = 0;

var json_paths = {
  examples: 'examples/**/*.json',
  models: 'fixtures/v2.0/json/models/**/*.json',
  resources: 'fixtures/v2.0/json/resources/**/*.json',
  responses: 'fixtures/v2.0/json/responses/**/*.json'
  // What are the other files in fixtures/v2.0/json/*.json
};

gulp.task('lint', function() {
  return gulp.src(['./**/*.json', '!./node_modules/**/*.json'])
      .pipe(jsonlint())
        .pipe(jsonlint.reporter());

  // YAML linting/formatting?
});

gulp.task('yaml2json', function(){
  gulp.src('./fixtures/v2.0/yaml/**.yaml')
    .pipe(gulpyaml({ pretty: true }))
      .pipe(gulp.dest('./fixtures/v2.0/json'));

  gulp.src(json_paths.examples)
    .pipe(gulpyaml({ pretty: true }))
      .pipe(gulp.dest('examples/'));
});

gulp.task('json2yaml', function(){
  return gulp.src('./fixtures/v2.0/json/**/*.json')
    .pipe(map(function(file, cb) {
        data = JSON.parse(file.contents);
        file.contents = new Buffer(String(YAML.stringify(data)));
        cb(null, file);
      }))
      .pipe(ext_replace('.yaml'))
      .pipe(gulp.dest('fixtures/v2.0/yaml'));
});

