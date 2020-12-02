# Praw
Framework front-end

### Installation
```sh
npm i praw gulp gulp-rimraf node-sass gulp-sass gulp-babel @babel/core @babel/preset-env gulp-concat babel-preset-minify
```

Exemple de config scss
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
"light": #EDF2F4, // OBLIGATOIRE
"dark": #2B2D42, // OBLIGATOIRE
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

Exemple de gulpfile
```javascript
const gulp = require('gulp');
const rimraf = require('gulp-rimraf');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

function clean() {
    return gulp.src("dist/*", {read: false}).pipe(rimraf());
}

function styles() {
    return gulp.src('src/scss/config.scss')
            .pipe(gulp.src('node_modules/praw/src/scss/*.scss'))
            .pipe(gulp.dest('node_modules/praw/src/scss'))
            .pipe(concat('praw.scss'))
            .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(concat('praw.min.css'))
            .pipe(gulp.dest('dist/css'));
}

function scripts() {
    return gulp.src('node_modules/praw/src/js/**/*.js')
            .pipe(babel({presets: ['minify']}))
            .pipe(concat('praw.min.js'))
            .pipe(gulp.dest('dist/js'));
}

function fonts() {
    return gulp.src('node_modules/praw/src/fonts/*')
            .pipe(gulp.dest('dist/fonts'));
}

var build = gulp.series(clean, gulp.parallel(styles, scripts, fonts));

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.fonts = fonts;
exports.build = build;

exports.default = build;
```

### Documentation
[CSS et JS](https://hrodedotfr.github.io/praw/)

### Packages npm conseillés
| package | utilité |
| ------ | ------ |
| express | Infrastructure Web minimaliste, souple et rapide |
| acl | Module de liste de contrôle d'accès, basé sur Redis avec prise en charge du middleware Express |
| forms | Moyen simple de créer, analyser et valider des formulaires |
| crypto (intégré à nodejs) | Moyen de gérer les données chiffrées |
| morgan | Middleware de journalisation des requêtes HTTP |
| express-fileupload | Middleware express pour l'upload de fichiers |
| lodash | Bibliothèque d'utilitaires JS |
| sequelize | ORM |
| express-session | Middleware de session pour Express |
| nodemailer | Envoi d'emails |
| ejs | Moteur de template |