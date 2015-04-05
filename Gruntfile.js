module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                browsers: [ 'PhantomJS' ]
            }
        },
        ngdocs: {
            all: {
                src: [ 'src/**/*.js', '!src/**/*.spec.js' ]
            }
        },
        connect: {
            docs: {
                options: {
                    base: 'docs',
                    port: '8080',
                    keepalive: true,
                    open: 'http://localhost:8080/'
                }
            }
        }
    });

    // tasks
    grunt.registerTask('doc', [ 'ngdocs', 'connect:docs' ]);

    // load grunt npm tasks
    var tasks = [
        'grunt-karma',
        'grunt-contrib-copy',
        'grunt-contrib-concat',
        'grunt-contrib-connect',
        'grunt-contrib-uglify',
        'grunt-contrib-clean',
        'grunt-ngdocs'
    ];

    tasks.forEach(function (gruntTaskName) {
        grunt.loadNpmTasks(gruntTaskName);
    }) ;
};