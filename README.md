### HTML INCLUDER 0.1.1 ###
HTML内容嵌入

1. 环境要求

    1.1. 需本地安装node环境

    1.2. 支持sublime text 3

    1.3. 只支持html或htm文件

2. 配置文件

    2.1. 当前文件目录下，建立includer.json文件进行配置  
    配置文件内容格式：
    ```
    {
        "root" : "e:/test/sbtTest/",
        "outputPath" : "output1/",
        "replaceURL" : true
    }
    ```
    2.2. 参数说明：  
    2.2.1. root ： 项目根目录，绝对路径或相对当前目录的相对路径；  
    2.2.2. outputPath ： 输出路径配置；  
        嵌入路径以/开头，如已配置root，视为相对root为根目录的路径；若未配置root，视为绝对路径；  
        路径以./开头，强制相对当前文件；  
        以盘符开头的绝对路径，忽略root设置；  
        路径为其他规则的相对路径，相对于root；如未配置root，则相对当前文件； 
    2.3. replaceURL 是否替换当前文件与嵌入文件中的URL为相对输出文件的URL
    2.4. 如无配置文件，则视为
    ```
    {
        "root" : "",
        "outputPath" : "",
        "replaceURL" : true
    }
    ```
3. html中嵌入页面文件

    3.1. HTML文件中，以 \<!-- @include[./header1.html] --> 格式进行导入；

    3.2. 嵌入的文件也应为html格式；

    3.3. 中括号内为嵌入文件路径；  
        嵌入路径以/开头，如已配置root，视为相对root为根目录的路径；若未配置root，视为绝对路径；  
        路径以./开头，强制相对当前文件；  
        以盘符开头的绝对路径，忽略root设置；  
        路径为其他规则的相对路径，相对于root；如未配置root，则相对当前文件；  
        如引用文件不存在，则不嵌入；

4. sublime下命令

    ctrl + shift + p 调出命令面板；  
    选择 "HTML Includer - Build" 当前文件将自动保存，按配置构建并进行输出；  
    选择 "HTML Includer - Build All" 当前文件将自动保存，按配置构建并输出当前文件所在文件夹下所有HTML文件；
    

5. 文件输出

    如未配置outputPath，则输出在当前目录下 *.out.html，否则按配置文件输出；

6. 版本更新说明
    
    v0.1.2    
    修复BUG；
    
    v0.1.1    
    增加文件内容缓存；

    v0.1.0  
    重构js文件，新增“输出当前文件所在文件夹下所有HTML文件”功能；  
    调整py文件；  
