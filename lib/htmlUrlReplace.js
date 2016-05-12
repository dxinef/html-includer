//change the url in html content
var path = require("path");

var config = require("./config.js");

module.exports = function(html, inputPath, outputPath) {
    if(path.extname(inputPath)) inputPath = path.parse(inputPath).dir;
    return html.replace(
        /(src=['"]|href=['"]|url\()([^'"\)]+)?(['"\)])/ig,
        function(match, before, url, after){
            if(!url) {
                return match;
            }
            else if(config.root && inputPath.search(/^\//)>-1) {
                return before + path.relative(outputPath, path.join(inputPath.replace(/^\//,""), url)) + after
            }
            else if(path.isAbsolute(url)) {
                return match;
            }
            else {
                return before + path.relative(outputPath, path.join(inputPath, url)) + after;
            }
        }
    )
}