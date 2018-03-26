const resolvePath = (path) => require('path').resolve(__dirname, path);
const paths = {
    directories: {
        nodeModules:   resolvePath('../node_modules'),
        dist:          resolvePath('../dist'),
    },
    indexHtml:              resolvePath('../src/index.html'),
    bootstrap:              resolvePath('../src/bootstrap.js')
}
module.exports = paths;