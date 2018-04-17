
const gulp              = require('gulp')
    , browserSync       = require('browser-sync').create()
    , reload            = browserSync.reload;

const paths = {
    watch: {
        html: './*.html',
        css : './app/css/*.css',
        js  : './app/js/*.js'
    }
};

const config = {
    server: {
        baseDir: './'
    },
    notify: false
};

gulp.task('serve', () => browserSync.init(config));

gulp.task('watch', ['serve'], () => {
    gulp.watch(paths.watch.html     , reload);
    gulp.watch(paths.watch.js       , reload);
    gulp.watch(paths.watch.css      , reload);
});