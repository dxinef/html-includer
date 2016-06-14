/*
function getCmdParams(cmdParamList){
    var arg = process.argv.slice(2).join(" ");

    for(var key in cmdParamList) {
        let reg = new RegExp("-" + key + "\\b(?:\\s*(\\S+)\\b)?", "ig");
        let match = reg.exec(arg);
        cmdParamList[key] = match ? (match[1] ? match[1] : "") : "";
    }
    return cmdParamList;
}
*/

function getCmdParams(cmdParamList) {
    var args = process.argv.slice(2);
    var len = args.length;
    var tmpArg = "",
        tmpVal = [],
        tmpIndex = 0;
    args.forEach((arg, index)=>{
        //如果当前值是-开头
        if(/^-\w+/.test(arg)) {
            //如果已有tmpArg，则先对cmdParamList中对应字段赋值
            if(tmpArg) {
                //赋值
                cmdParamList = cmdParamList_set(cmdParamList, tmpArg, tmpVal);
                //重置tmpArg tmpVal
                tmpArg = "";
                tmpVal = [];
            }
            tmpArg = arg.slice(1);
            tmpIndex = index;
        }
        else if(tmpArg && index > tmpIndex) {
            tmpVal.push(arg);
        }
        if(tmpArg && index == len-1) {
            cmdParamList = cmdParamList_set(cmdParamList, tmpArg, tmpVal);            
        }
    });
    return cmdParamList;
}

function cmdParamList_set(cmdParamList, key, val){
    if(key in cmdParamList) {
        //如果是字符串类型
        if(typeof cmdParamList[key] == "string"){
            cmdParamList[key] = val.join(" ");
        }
        //如果是boolean类型
        else if(cmdParamList[key] == "boolean") {
            cmdParamList[key] = true;
        }
        else {
            cmdParamList[key] = val;
        }
    }
    else {
        cmdParamList[key] = val;
    }
    return cmdParamList;
}

module.exports = getCmdParams;