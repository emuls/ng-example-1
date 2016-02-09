'use strict';

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-ng-annotate');

	grunt.initConfig({
		watch: {
			files: ["src/**/*"],
			tasks: ["build"]
		},
		clean: ["DIST"],
		copy: {
			htmldist: {
				cwd: 'src/www',  // set working folder / root to copy
				src: '**/*.html',           // copy all files and subfolders
				dest: 'DIST',    // destination folder
				expand: true           // required when using cwd
			}
		},
		concat: {
			dist: {
				src: ['src/www/modules.js', 'src/www/app.js', 'src/www/**/*.js'],
				dest: 'DIST/scripts/main.js'
			}
		},
		less: {
			dist: {
				files: {
					"DIST/stylesheets/style.css": "src/**/*.less"
				}
			},
		},
		ngAnnotate: {
			options: {
				singleQuotes: true,
			},
			dist: {
				files: [
					{
						expand: true,
						src: ['DIST/scripts/main.js'],
						ext: '.annotated.js', // Dest filepaths will have this extension.
						extDot: 'last',       // Extensions in filenames begin after the last dot
					},
				],
			},
		},
		uglify: {
			options: {
				mangle: true
			},
			min: {
				files: {
					'DIST/scripts/main.min.js': ['DIST/scripts/main.annotated.js']
				}
			}
		}
	});
	// the default task (running "grunt" in console) is "watch"
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['clean', 'copy', 'concat', 'less', 'ngAnnotate', 'uglify']);
};
