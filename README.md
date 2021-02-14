# Praw
Framework front-end

### Installation
```sh
npm i praw gulp gulp-rimraf node-sass gulp-sass gulp-babel @babel/core @babel/preset-env gulp-concat babel-preset-minify gulp-strip-comments gulp-rename
```

Exemple de config scss (dans src/scss/config)
```scss
// === Couleurs === //
$colors: (
"primary": #EF233C,
"secondary": #D90429,
"complementary": #25EFD7,
"conf": #2ECC71,
"err": #E74C3C,
"info": #0097E6,
"warn": #F1C40F,
"light": #EDF2F4,
"dark": #2B2D42,
"grey": #8D99AE,
"white": #FBFEF9,
"black": #1A202C,
"blue": #3366CC,
"cyan": #3399CC,
"green": #66CC66,
"orange": #ED8936,
"pink": #FFC0CB,
"purple": #CC66FF,
"red": #E84118,
"turquoise": #40E0D0,
"yellow": #FBC531
);

// === Margins et paddings === //
$margins-paddings-size:1rem;

// === Grille === //
$container-widths: (
"xs": 0px,
"s": 576px,
"m": 768px,
"l": 996px,
"xl": 1200px
);
```

Exemple de style scss (dans src/scss)
```scss
@import "config/praw.scss";

@import "components/_reset.scss";
@import "components/_animations.scss";
@import "components/_avatars.scss";
@import "components/_buttons.scss";
@import "components/_cards.scss";
@import "components/_clearfix.scss";
@import "components/_code.scss";
@import "components/_colors.scss";
@import "components/_display.scss";
@import "components/_flex.scss";
@import "components/_font.scss";
@import "components/_footer.scss";
@import "components/_forms.scss";
@import "components/_frames.scss";
@import "components/_grid.scss";
@import "components/_header.scss";
@import "components/_layout.scss";
@import "components/_links.scss";
@import "components/_lists.scss";
@import "components/_medias.scss";
@import "components/_misc.scss";
@import "components/_modals.scss";
@import "components/_modifiers.scss";
@import "components/_pagination.scss";
@import "components/_placeholder.scss";
@import "components/_position.scss";
@import "components/_spacing.scss";
@import "components/_tables.scss";
@import "components/_tabs.scss";
@import "components/_tags.scss";
@import "components/_tiles.scss";
@import "components/_toasts.scss";
@import "components/_tooltips.scss";
```

Exemple de gulpfile
```javascript
const gulp = require('gulp');
const rimraf = require('gulp-rimraf');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gos = require('gulp-obfuscate-selectors');
const strip = require('gulp-strip-comments');
const rename = require('gulp-rename');

function clean() {
    return gulp.src("dist/*", {read: false}).pipe(rimraf());
}

function styles() {
    return gulp.src('src/scss/style.scss')
            .pipe(sass.sync({outputStyle: 'compressed', includePaths: ["./node_modules/praw/src/scss"]}).on('error', sass.logError))
            .pipe(gulp.dest('dist/css'))
            .pipe(concat('style.css'));
}

function prawScripts() {
    return gulp.src('node_modules/praw/src/js/**/*.js')
            .pipe(strip())
            .pipe(babel({presets: ['minify']}))
            .pipe(concat('praw.min.js'))
            .pipe(gulp.dest('dist/js'));
}

function scripts() {
    return gulp.src('src/js/*.js')
            .pipe(strip())
            .pipe(babel({presets: ['minify']}))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('dist/js'));
}

function views() {
    return gulp.src(['src/**/*.html', 'dist/**/*.css', 'dist/**/*.js'])
            .pipe(gos.run())
            .pipe(gulp.dest('dist'));
}
exports.default = gulp.series(clean, style, prawScripts, scripts, views);
```

### Documentation
[CSS et JS](https://hrodedotfr.github.io/praw/)

### Packages npm conseillés
| package | utilité |
| ------ | ------ |
| express | Infrastructure Web minimaliste, souple et rapide |
| acl | Module de liste de contrôle d'accès, basé sur Redis avec prise en charge du middleware Express |
| forms | Moyen simple de créer, analyser et valider des formulaires |
| morgan | Middleware de journalisation des requêtes HTTP |
| express-fileupload | Middleware express pour l'upload de fichiers |
| lodash | Bibliothèque d'utilitaires JS |
| sequelize | ORM |
| express-session | Middleware de session pour Express |
| nodemailer | Envoi d'emails |