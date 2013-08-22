module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		uglify: {
			js: {
				files: {
					'jquery.fixheight.min.js': ['jquery.fixheight.js']
				}
			}
		}
	});
};
