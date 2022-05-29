const project_folder = 'dist';
const source_folder = 'src';

// объекты с путями файлов
let path = {
    build:{
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js/',
        img: project_folder + '/img/',
        fonts: project_folder + '/fonts/',
    },
    src:{
        html: [source_folder + '/*.html', "!"+source_folder + "/_*.html"],
        css: source_folder + '/scss/style.scss',
        js: source_folder + '/js/script.js',
        img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
        fonts: source_folder + '/fonts/*.ttf',
    },
    watch:{
        html: source_folder + '/**/*.html',
        css: source_folder + '/scss/**/*.scss',
        js: source_folder + '/js/**/*.js',
        img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    },
    clean: './' + project_folder + '/'

}


const {src, dest, parallel, series} = require('gulp');
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const del = require('del');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
// оптимизирует стилевой файл
const clean_css = require('gulp-clean-css');
// объединяет стилевой файл
const group_media = require('gulp-group-css-media-queries');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webphtml = require('gulp-webp-html');

// ф-ия обновляет браузер
function browserSync(params){
    browsersync.init({
        server: {
            baseDir: './' + project_folder + '/'
        },
        port: 3000,
        notify: false
    })
}

function html(params){
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        // переношу файлы в папку билд
        .pipe(dest(path.build.html))
        // стрим обновляет страницу
        .pipe(browsersync.stream())
}

function css(){
    return src(path.src.css)
        .pipe(scss({
        outputStyle: 'expanded'
        }))
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 2 versions'],
                cascade: true
            })
        )
        
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        // переношу файлы в папку билд
        .pipe(dest(path.build.css))
        // стрим обновляет страницу
        .pipe(browsersync.stream())
}

function js(params){
    return src(path.src.js)
        .pipe(fileinclude())
        // переношу файлы в папку билд
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: '.min.js'
            })
        )
        .pipe(dest(path.build.js))
        // стрим обновляет страницу
        .pipe(browsersync.stream())
}

function images(params){
    return src(path.src.img)
        .pipe(
            webp({
            quality: 70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3 // 0 to 7
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function watchFiles(params){
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clean(params){
    return del(path.clean);
}

const build = gulp.series(clean, gulp.parallel(js, css, html, images));
const watch = gulp.parallel(build,watchFiles, browserSync);

exports.images = images;
exports.js = js
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;