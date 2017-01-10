'use strict';

var chalk = require('chalk');
var YAML = require('yamljs');
var md5 = require('md5');


// task implementation
module.exports = function (grunt) {

	grunt.registerMultiTask('frontmatter', 'Extract YAML frontmatter from multiple files into one JSON', function () {

		var options = this.options({
			minify: false,
      dirname: false,
			width: 'sentence', 
			metadata: {},
		});

		var count = 0;

		this.files.forEach(function (f) {
			var validFiles = removeInvalidFiles(f);

			count += writeCompiledFile(f.dest, concatOutput(validFiles, options));
		});

		grunt.log.ok(count + ' files created.');


		function compileFrontmatter(body, options, filepath) {

			var lines = body.split(/[\n\r]+/g);      

			var end = 0;
			var data;			
			if (lines[0] === '---') {
				end = 1;
				while (lines[end] !== '---' && lines[end] !== lines[-1]) {
					end++;
				}

				var yaml = lines.slice(1, end).join('\n');
				var data = YAML.parse(yaml);

				var preview = data.preview;
				if (!preview) {
					preview = lines.slice(end+1).join(' ');
					if (options.width === 'sentence') {
						preview = preview.split('. ')[0] + '.';
					} else if (options.width.slice && options.width.slice(-1) === 's') {
						preview = preview.split('. ').slice(0, parseInt(options.width,10)).join('. ') + '.';
					} else if (options.width > 0) {
						preview = preview.slice(0, options.width);
					} else {
						preview = undefined;
					}
				}

				data.preview = data.preview || preview;
			} else {
				data = {
					preview: body.slice(0, options.width),
				};
			}

      computeBasename(data, filepath);
      computeDirname(data, options, filepath);
			computeMd5(data, body);
			return data;
		}

    function computeBasename(data, filepath) {
      var basename = filepath.split('/').slice(-1)[0].split('.')[0];

      data.basename = basename;
    }

    function computeDirname(data, options, filepath) {
      if (options.dirname) {
        var dirname = filepath.split('/').slice(0, -1).join('/');

        data.dirname = dirname;
      }
    }

    function computeMd5(data, body) {
      data.md5 = md5(body);
    }

		function concatOutput(files, options) {
			var result;

			result = {};
			files.forEach(function(filepath) {
				var body = grunt.file.read(filepath);
				var data = compileFrontmatter(body, options, filepath);
        var key = options.dirname ? data.dirname + '/' + data.basename : data.basename;
				result[key] = data;
			});

			if (options.minify) {
				result = JSON.stringify(result);
			} else {
				result = JSON.stringify(result, undefined, 2);
			}

			return result;
		}

		function removeInvalidFiles(files) {
			return files.src.filter(function(filepath) {
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			});
		}

		function writeCompiledFile(path, output) {
			if (writeFile(path, output)) {
				grunt.verbose.writeln('File ' + chalk.cyan(path) + ' created.');
				return 1;
			} else {
				return 0;
			}
		}

		function writeFile(path, output) {
			if (output.length < 1) {
				grunt.log.warn('Destination "' + path + '" not written because compiled files were empty.');
				return false;
			} else {
				grunt.file.write(path, output);
				return true;
			}
		}

	});

};
