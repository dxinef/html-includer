//change the url in html content
var path = require("path"),
    url = require("url");

module.exports = function(html, inputPath, outputPath, rootPath) {
    if(path.extname(inputPath)) inputPath = path.parse(inputPath).dir;
    return html.replace(
        /(src=['"]|href=['"]|url\()([^'"\)]+)?(['"\)])/ig,
        function(match, before, url, after){
            var r = "", u = "";
            if(!url || url.search(/^javascript\:/i)>-1) {
                r = match;
            }
            else if(rootPath && url.search(/^\//)>-1) {
                u = path.relative(outputPath, path.join(outputPath, url.replace(/^\//,"")));
                r = before + u + after;
            }
            else if(path.isAbsolute(url)) {
                r = match;
            }
            else {
                u = path.relative(outputPath, path.join(inputPath, url));
                r = before + u + after;
            }
            // console.log(r)
            r = r.replace(/\\/g,"\/");
            return r;
        }
    )
}