const path = require(`path`);

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@Utils': path.resolve(__dirname, 'src/utils'),
            '@Const': path.resolve(__dirname, 'src/utils/const.js'),
            '@Components': path.resolve(__dirname, 'src/components'),
            '@Theme': path.resolve(__dirname, 'src/theme'),
            '@Error': path.resolve(__dirname, 'src/pages/error')
        }
    },
};