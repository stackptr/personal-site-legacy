var input = "src";
var output = "dist";

// name is an identifier for the page
// title is how to display the name of the page
function Page(id, title, url, icon) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.icon = icon;
}

var pages = [
    new Page("index", "/", "/", "home"),
    new Page("stats", "/stats", "stats.html", "bar-chart"),
    new Page("screens", "/screens", "screens.html", "desktop"),
    new Page("hosted", "/hosted", "hosted.html", "folder-close-alt"),
    new Page("hardware", "/hardware", "hardware.html", "cog"),
    new Page("propaganda", "/propaganda", "propaganda.html", "linux"),
    new Page("library", "library.txt", "library.txt", "music")
];

module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: [output],
        jshint: {
            all: ['Gruntfile.js']
        },
        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: { debug: false, pages: pages, date: new Date() }
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
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    return grunt.registerTask("default", ["clean", "jshint", "jade", "copy"] );
};
