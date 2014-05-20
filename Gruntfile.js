var srcFiles = ['src/js/*.js'],
    srcHtml = ['src/*.html'],
    srcCss = ['src/css/*.css'],
    srcTemplates = ['src/templates/*.hbs'],
    specJs = ['spec/*.js'],
    specHtml = ['spec/*Spec.html'],
    lintFiles = [].concat(srcFiles, specJs, ['Gruntfile.js']),
    watchFiles = [].concat(srcFiles, srcTemplates, srcHtml, srcCss, specJs, specHtml, lintFiles);

/* global module, process */
module.exports = function(grunt) {
    /* jshint camelcase: false */
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: true
            },
            all: lintFiles
        },
        connect: {
            server: {
                options: {
                    port: 1337
                }
            }
        },
        watch: {
            scripts: {
                options: {
                    atBegin: true
                },
                files: watchFiles,
                tasks: ['default']
            }
        },
        mocha_phantomjs: {
            all: specHtml
        },
        clean: [ 'dist/', 'build/' ]
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    grunt.registerTask('default', ['jshint', 'mocha_phantomjs']);
    grunt.registerTask('dev', ['connect', 'watch']);
};

