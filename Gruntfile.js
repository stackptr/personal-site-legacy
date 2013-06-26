module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            test: "output"
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
                    dest: "output/",
                    ext: '.html'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-clean');
    return grunt.registerTask("default", ["clean", "jade"] )
};
