# Praw
Framework front-end

### Installation
```sh
npm i praw gulp gulp-rimraf node-sass gulp-sass gulp-babel @babel/core @babel/preset-env gulp-concat gulp-clean-css babel-preset-minify
```

Exemple de config scss
```scss
// === Couleurs === //
$colors: (
"primary": #1E96FC,
"secondary": #336EEF,
"complementary": #FDE74C,
"conf": #2ECC71,
"err": #E74C3C,
"info": #0097E6,
"warn": #F1C40F,
"light": #F7FAFC,
"dark": #2A282A,
"white": #FBFEF9,
"black": #1A202C,
"grey": #919193,
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
const minifyCSS = require('gulp-clean-css');

function clean() {
    return gulp.src("dist/*", {read: false}).pipe(rimraf());
}

function styles() {
    return gulp.src('src/scss/config.scss')
            .pipe(gulp.src('node_modules/praw/src/scss/*.scss'))
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(concat('praw.min.css'))
            .pipe(minifyCSS({compatibility: 'ie8'}))
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