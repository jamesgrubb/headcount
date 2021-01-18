module.exports = {
    plugins: [
        require('tailwindcss')('./src/styles/tailwind.config.js'),
        require('postcss-import'),
        require('autoprefixer'),
        require('postcss-nested'),
        require('postcss-custom-properties'),
        
    ]
}