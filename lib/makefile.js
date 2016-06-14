
const fs = require("fs"),
    path = require("path");

var parsePath;

const urlChange = require("./urlChange.js");

// 生成文件内容
function makefile(file, myParsePath, cache){
    parsePath = myParsePath;

    fs.readFile(file, "utf8", (err, data)=>{
        if(err) {
            console.log("can't read", colorText(file, "red"), "!");
            return;
        }
        // 替换当前文件中的url
        var fileContent = urlChange(data, path.dirname(file), path.dirname(file));
        // 引入规则部分
        var reg = /\<\!\-\-\s*@include\s*\[\s*(.*?)\s*\]\s*\-\-\>/igm;

        fileContent = fileContent.replace(reg, function(match, _path){
            _path = parsePath.parse(_path);
            var r = "";
            if(_path in cache) {
                r = cache[_path];
            }
            else if(!fs.existsSync(_path)) {
                r = cache[_path] = "";
            }
            else {
                cache[_path] = fs.readFileSync(_path, {"encoding" : "utf8"});
                r = urlChange(cache[_path], path.dirname(_path), path.dirname(_path));
            }
            return r;
        });

        writeFile(file, fileContent);
        
    });
}

// 输出文件
function writeFile(filename, fileContent){
    // 输出文件路径与文件名
    var outputFile = (parsePath.outputPath == parsePath.thisdir) ? (parsePath.outputPath + "\\" + path.parse(filename).name + ".out" + path.parse(filename).ext) : (parsePath.outputPath + "\\" + path.parse(filename).base);

    fs.exists(parsePath.outputPath, (exists)=>{
        //如果路径不存在则新建文件夹
        if(!exists) fs.mkdirSync(parsePath.outputPath);
        //写入文件
        fs.writeFile(outputFile, fileContent, (err)=>{
            if(err) console.error(err);
            else console.log("输出文件 \"", outputFile, "\" 成功！ ");
        });
    });
}

module.exports = makefile;
