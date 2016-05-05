
var fs = require("fs"),
    path = require("path");

var args = process.argv.slice(2);

// 路径解析
//// 当前文件
var thisFile = path.resolve(args[0]),
    thisFile_parse = path.parse(thisFile);

//// 如果不是html则退出
if(thisFile_parse.ext != ".html" && thisFile_parse.ext != ".htm") {
    console.log("This file is not a html file!");
    return false;
}

//// 查找config文件，如不存在则进行初始化
var config = require("./lib/config.js")(thisFile_parse.dir),
    pathParse = require("./lib/parsePath.js")(thisFile_parse.dir);

//// 根路径
var rootPath = pathParse.rootPath;

//// 输出路径
var outputPath = pathParse.parse(config.outputPath),
    outputFile = (outputPath == thisFile_parse.dir) ? (outputPath + "\\" + thisFile_parse.name + ".out" + thisFile_parse.ext) : (outputPath + "\\" + thisFile_parse.base),
    outputFile_parse = path.parse(outputFile);

// 读取当前html文件
var thisFileContent = fs.readFileSync(thisFile, "utf8");

// 匹配与替换
var outputContent = thisFileContent.replace(
    /\<\!\-\-\s*@include\s*\[\s*(.*?)\s*\]\s*\-\-\>/g,
    function(match, includeFile){
        var r = "",
            p = pathParse.parse(includeFile);
        try {
            r = fs.readFileSync(p, "utf8");
            console.log("load \"", p, "\" success! (^_^)");
        }
        catch(e) {   
            console.log("load \"", p, "\" fail! (O_O)");
        }
        return r;
    }
);

// 输出文件
fs.exists(outputFile_parse.dir, function(exists){
    if(!exists) fs.mkdirSync(outputFile_parse.dir);
    fs.writeFile(outputFile, outputContent, function(err){
        if(err) console.error(err);
        else console.log("output \"", outputFile ,"\" success!成功");
    })
})

