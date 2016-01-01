/**
 * Created by melanie on 29/12/15.
 */

"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');

// Démarrage du serveur sur le port 8080
gulp.task('connect', function() {
    connect.server({
        root: 'src',
        base: '192.168.0.29',
        port: 8080
    });
});

gulp.task('default', ['connect']);