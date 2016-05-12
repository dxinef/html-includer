// parse file path

var path = require("path");

//var conf = require("./config.js");

function pathParse(thisFileDir) {
    var config = require("./config.js")(thisFileDir);
    var r = {};
    //计算rootPath
    r.rootPath = config.root ? path.resolve(thisFileDir, config.root) : thisFileDir;
    //计算outputPath
    //r.outputPath = config.outputPath ? path.resolve(rootPath, config.outputPath) : thisFileDir;
    //inputPath解析
    r.parse = function(inputPath){
        //解析输入的path
        var p = path.resolve(r.rootPath, inputPath);
        //如果配置过root，inputPath以/开头，则视为相对root的path
        if(config.root && inputPath.search(/^\//)>-1) {
            p = path.resolve(r.rootPath, inputPath.replace(/^\//,""));
        }
        //如果以./开头，则视为相对当前文件的path
        else if(inputPath.search(/^\.\//)>-1) {
            p = path.resolve(thisFileDir, inputPath);
        }
        return p;
    }

    return r;
}

module.exports = pathParse;