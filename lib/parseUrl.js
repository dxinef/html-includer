//引入path
const path = require("path");

module.exports = (urlStr, thisPath, fatherPath)=>{
    //如果入参为空或者为某些协议开头绝对路径则返回原值
    if(!urlStr || /^(javascript|http|https|ftp|mailto|file)\:/i.test(urlStr)) return urlStr;
    //includer.json解析
    var conf = require("./requireConf.js")(fatherPath);
    // 路径解析
    var pathParse = require("./parsePath.js")(fatherPath);

    var url = "";

    //如果设置了root路径，且入参以/开头，返回为基于root的路径
    if(conf.root && /^\s*\//.test(urlStr)) {
        url = path.relative(pathParse.outputPath, path.join(pathParse.rootPath, urlStr.replace(/^\//,"")));
    }
    //其他入参，返回为基于当前文件的路径
    else {
        url = path.relative(pathParse.outputPath, path.join(thisPath, urlStr));
    }
    return url.replace(/\\/g,"\/");;

}