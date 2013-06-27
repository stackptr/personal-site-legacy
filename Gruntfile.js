// Set path variables for Grunt tasks
var home = process.env.HOME,
    input = "src",
    output = "dist",
    views = input+"/views",
    assets = input+"/assets",
    cssdir = input+"/css",
    jsdir = input+"/js",
    less = input+"/less";

/* Page model
 * id: Unique identifier
 * title: display name
 * url: link attribute
 * icon: FontAwesome icon name (do not include "icon-")
 */
function Page(id, title, url, icon) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.icon = icon;
}

// Create an array of pages to show in navigation element
var pages = [
    new Page("index", "/", "/", "home"),
    new Page("stats", "/stats", "stats.html", "bar-chart"),
    new Page("screens", "/screens", "screens.html", "desktop"),
    new Page("hosted", "/hosted", "hosted.html", "folder-close-alt"),
    new Page("hardware", "/hardware", "hardware.html", "cog"),
    new Page("propaganda", "/propaganda", "propaganda.html", "linux"),
    new Page("library", "library.txt", "library.txt", "music")
];

// Begin Grunt configuration
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: [output],
        jshint: {
            all: ['Gruntfile.js', jsdir+'/**/*.js']
        },
        csslint: {
            options: {
                'unique-headings': false
            },
            all: [cssdir+'**/*.css']
        },
        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: { pages: pages, date: new Date() }
                },
                files: [{
                    expand: true,
                    cwd: views,
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
                    cwd: assets,
                    src: "**",
                    dest: output
                }, {
                    expand: true,
                    cwd: jsdir,
                    src: "**",
                    dest: output+'/js'
                }, {
                    expand:true,
                    cwd: cssdir,
                    src: "**",
                    dest: output+'/css'
                }]
            }
        },
        symlink: {
            publicfiles: {
                target: home+'/public',
                link: output+'/public',
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-symbolic-link');
    return grunt.registerTask("default", ["clean", "jshint", "csslint", "jade", "copy", "symlink"] );
};
