const cheerio = require('gulp-cheerio');
	gulp = require('gulp'),
	replace = require('gulp-replace'),
	svgmin = require('gulp-svgmin'),
	svgSprite = require('gulp-svg-sprites');

const path = {
	build: {
		root: 'build/'
	},
	src: {
		root: 'src/'
	}
};


		gulp.task('svgSpriteBuild', () => {
	// get svg
	return gulp.src('src/img/svg/animals/*.svg', 'src/img/svg/animals/*.svg')
	// minify svg
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		// remove all fill, style and stroke declarations in out shapes
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
		// cheerio plugin create unnecessary string '&gt;', so replace it.
		.pipe(replace('&gt;', '>'))
		// build svg sprite
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "../sprite.svg",
					render: {
						scss: {
							dest:'../../../sass/_sprite.scss',
							template: assetsDir + "sass/templates/_sprite_template.scss"
						}
					}
				}
			}
		}))
		.pipe(gulp.dest(assetsDir + 'i/sprite/'));
});