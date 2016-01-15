
'use strict';
 
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.initConfig({
        watch: {
            files: "www/stylesheets/*.less",
            tasks: ["less:compile"]
        },
        less: {
            compile: {
                options: {
                    // Specifies directories to scan for @import directives when parsing. 
                    // Default value is the directory of the source, which is probably what you want.
                    paths: ["stylesheets/"],
                },
                files: {
                    // compilation.css  :  source.less
                    "www/stylesheets/style.css": "www/stylesheets/style.less"
                }
            },
        },
    });
     // the default task (running "grunt" in console) is "watch"
     grunt.registerTask('default', ['watch']);
};
