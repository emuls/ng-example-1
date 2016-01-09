
'use strict';
 
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.initConfig({
        watch: {
            files: "stylesheets/*.less",
            tasks: ["less"]
        },
        less: {
            development: {
                options: {
                    // Specifies directories to scan for @import directives when parsing. 
                    // Default value is the directory of the source, which is probably what you want.
                    paths: ["stylesheets/"],
                },
                files: {
                    // compilation.css  :  source.less
                    "stylesheets/style.css": "stylesheets/style.less"
                }
            },
        },
    });
     // the default task (running "grunt" in console) is "watch"
     grunt.registerTask('default', ['watch']);
};
