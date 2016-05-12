//change the url in html content
var path = require("path");

module.exports = function(html, inputPath, outputPath) {
    if(path.extname(inputPath)) inputPath = path.parse(inputPath).dir;
    return html.replace(
        /(src=['"]|href=['"]|url\()([^'"\)]+)?(['"\)])/ig,
        function(match, before, url, after){
            return (!url || (path.isAbsolute(url) && !(config.root && inputPath.search(/^\//)>-1))) ? match : (before + path.relative(outputPath, path.join(inputPath, url)) + after);
        }
    )
}