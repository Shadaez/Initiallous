module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'public/styles.css': 'src/styles.scss'
				}
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			all: {
				files: [{
					expand: true,
					flatten: true,
					src: ['src/js/**.js'],
					dest: 'src/js/min/',
					ext: '.min.js'
				}]
			}
		},
		handlebars: {
			compile: {
				options: {
					namespace: "PHOTO.Templates",
					processName: function(path) {
						return path.match(/([\w\d]*).hbs$/)[1];
					}
				},
				files: {
					"src/js/min/templates.js": "src/templates/*.hbs"
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'src/js/**.js', 'index.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		watch: {
			css: {
				files: "src/*.scss",
				tasks: ['sass']
			},
			js: {
				files: ["src/js/*.js", "src/templates/*.hbs"],
				tasks: ['handlebars', 'jshint', 'uglify', 'concat']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-handlebars');

	grunt.registerTask('default', ['handlebars', 'jshint', 'uglify', 'sass']);
};