var input = "src";
var output = "dist";

module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: [output],
        // Jade configuration
        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: { debug: false }
                },
                files: [{
                    expand: true,
                    cwd: input+"/views",
                    src: "*.jade",
                    dest: output,
                    ext: '.html'
                }]
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: input+"/assets",
                    src: "**",
                    dest: output
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-clean');
    //grunt.loadNpmTasks('grunt-contrib-less');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    return grunt.registerTask("default", ["clean", "jade", "copy"] )
};
