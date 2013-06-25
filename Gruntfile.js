module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Jade configuration
        jade: {
            compile: {
                options: {
                    data: { debug: false }
                },
                files: {
                    "output": ["pages/*.jade"]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
}
