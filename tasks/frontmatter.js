'use strict';

var chalk = require('chalk');
var YAML = require('yamljs');


// task implementation
module.exports = function (grunt) {

	grunt.registerMultiTask('frontmatter', 'Extract YAML frontmatter from multiple files into one JSON', function () {

		var options = this.options({
			minify: false,
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
			var basename = filepath.split('/').slice(-1)[0].split('.')[0];

			var end = 0;			
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
					} else {
						preview = preview.slice(0, options.width);
					}
				}

				data.basename = basename;
				data.preview = data.preview || preview;

				return data;
			} else {
				return {basename: basename, preview: body.slice(0, options.width)};
			}
		}

		function concatOutput(files, options) {
			var result;

			result = {};
			files.forEach(function(filepath) {
				var body = grunt.file.read(filepath);
				var data = compileFrontmatter(body, options, filepath);
				result[data.basename] = data;
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