// parse includer.json
module.exports = function(thisFilePath){
    var config = {
        "root" : "",
        "outputPath" : "",
        "replaceURL" : true
    };
    try {
        //config = require(thisFile_parse.dir + "/includer.json");
        config = require(thisFilePath + "/includer.json");
    }
    catch(e) {
    }
    return config;
}