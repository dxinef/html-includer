
const fs = require("fs"),
    path = require("path");

//命令行参数处理
const args = require("./getCmdParams.js")({
    "file" : "",
    "dir" : ""
});

// 路径解析
const parsePathJs = require("./parsePath.js");

// 生成文件内容并输出
const makefile = require("./makefile.js");

var thisfile, thisdir;
//如果参数-file存在，则生成当前文件，忽略参数-dir
if(args.file) { 
    thisfile = args.file;
    thisdir = path.dirname(thisfile);
    //// 如果参数路径不存在则退出
    if(!fs.existsSync(thisfile)) {
        console.log("参数所指向路径不存在！");
        return;
    }
    //// 如果参数路径为文件夹则退出
    if(fs.statSync(thisfile).isDirectory()) {
        console.log("参数类型错误！");
        return;
    }
}
//如果参数-file不存在，则读取参数-dir，生成当前目录文件
else if(args.dir) {
    thisdir = args.dir;
    //// 如果参数路径不存在则退出
    if(!fs.existsSync(thisdir)) {
        console.log("参数所指向路径不存在！");
        return;
    }
    //// 如果参数路径不为文件夹则退出
    if(!fs.statSync(thisdir).isDirectory()) {
        console.log("参数类型错误！");
        return;
    }
}
//如果没有参数，则退出
else {
    console.log(colorText("need param -file or -dir","red"));
    return;
}

const parsePath = parsePathJs(thisdir);

//缓存
var cache = {};

if(args.file){
    // 处理当前文件
    makefile(thisfile, parsePath, cache);
}
else {
    // 处理目录下所有html文件
    fs.readdir(thisdir, (err, files)=>{
        if(err) {
            throw err;
            return;
        }
        //处理所有的html文件
        files.forEach((fileName)=>{
            if(path.extname(fileName) == ".html" || path.extname(fileName) == ".htm") {
                //输出(parsePath作为makefile的依赖直接传入)
                makefile(thisdir+"\\"+fileName, parsePath, cache);
            }
        });
    });
}
