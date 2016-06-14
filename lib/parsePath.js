//引入path
const path = require("path");
//includer.json解析
const requireConf = require("./requireConf.js");

module.exports = (thisdir)=>{
    var conf = requireConf(thisdir);
    var r = {};
    r.thisdir = thisdir;
    //如果设置过root，则返回root绝对路径，否则root设置为当前路径
    r.rootPath = conf.root ? path.resolve(thisdir, conf.root) : thisdir;
    //返回解析路径的方法
    r.parse = (pathStr)=> {
        var tmp = "";
        //如果设置了root路径，且入参以/开头，返回基于root的绝对路径
        if(conf.root && pathStr.match(/^\s*\//)) {
            tmp = path.resolve(r.rootPath, pathStr.replace(/^\s*\//,""));
        }
        //如果入参以./开头，返回基于当前文件路径的绝对路径
        else if(pathStr.match(/^\s*\.+\//)) {
            tmp = path.resolve(thisdir, pathStr);
        }
        //其他情况，返回基于root的绝对路径
        else {
            tmp = path.resolve(r.rootPath, pathStr);
        }
        return tmp;
    }
    //返回文件输出的绝对路径
    r.outputPath = r.parse(conf.outputPath);

    return r;
}
