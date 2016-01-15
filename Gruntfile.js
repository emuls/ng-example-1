
'use strict';
 
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        watch: {
            files: ["src/**/*"],
            tasks: ["clean","copy:htmldist","less:dist","concat:dist"]
        },
        clean: ["DIST"],
        copy: {
            htmldist : {
                cwd: 'src/www',  // set working folder / root to copy
                src: '**/*.html',           // copy all files and subfolders
                dest: 'DIST',    // destination folder
                expand: true           // required when using cwd
            }
        },
        concat: {
            dist : {
                src: ['src/www/modules.js','src/www/app.js','src/www/**/*.js'],
                dest: 'DIST/scripts/main.js'
            }
        },
        less: {
            dist: {
                options: {
                    paths: ["stylesheets/"],
                },
                files: {
                    "DIST/stylesheets/style.css": "src/**/*.less"
                }
            },
        },
    });
     // the default task (running "grunt" in console) is "watch"
     grunt.registerTask('default', ['watch']);
     grunt.registerTask('build', ['clean','copy:htmldist','concat:dist','less:dist']);
};
