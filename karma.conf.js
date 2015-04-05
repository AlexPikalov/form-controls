module.exports = function (config) {
    'use strict';

    config.set({
        frameworks: [ 'jasmine' ],
        files: [
            // ui dependencies
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            // source files
            'src/**/*.js'
        ],
        browsers: [ 'Chrome', 'PhantomJS' ],
        autoWatch: true
    });
};