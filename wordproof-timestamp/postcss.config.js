const purgecss = require('@fullhuman/postcss-purgecss')({
    content: ['./src/**/*.js'],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

const cssnano = require('cssnano');

module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        ...process.env.NODE_ENV === 'production'
            ? [purgecss, cssnano]
            : []
    ]
}
