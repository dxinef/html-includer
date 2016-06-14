
const path = require("path"),
    fs = require("fs");

module.exports = (thisdir)=>{
    return fs.existsSync(path.join(thisdir, "includer.json")) ? require(path.join(thisdir, "includer.json")) : { "root" : "", "outputPath" : "", "replaceURL" : true };
}
