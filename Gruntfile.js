var output_dir = "dist";

module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            test: output_dir
        },

        // Jade configuration
        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: { debug: false }
                },
                files: [{
                    expand: true,
                    cwd: "pages",
                    src: "*.jade",
                    dest: output_dir,
                    ext: '.html'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-clean');
    //grunt.loadNpmTasks('grunt-contrib-less');
    return grunt.registerTask("default", ["clean", "jade"] )
};
