
var parseUrl = require("./parseUrl.js");

module.exports = (srcHTML, srcFilePath, fatherFilePath)=> {
    var reg = /(?:src=['"]|href=['"]|url\()([^'"\)]+)?(?:['"\)])/igm;
    return srcHTML.replace(reg, function(match, url){
        return match.replace(url, parseUrl(url, srcFilePath, fatherFilePath));
    });
}
