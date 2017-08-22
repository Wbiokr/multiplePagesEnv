## 1.命令 ##
- 安装依赖：cnpm install;
- 开发模式：npm run dev;
- 生产构建：npm run build;
## 2.目录 ##
### 2.1 package.json ###
    插件依赖
### 2.2 webpack.config.js ###
    webpack配置文件；
    其中：变量hostName、devPort、插件OpenBrowserPlugin可以按需更改
### 2.3 src/APPcommon目录 ###
- components：常用以及公共组件文件夹；
- font：字体库；
- modules：常用js模块；
- style：mixin为sass常用函数，自己可以按需添加；normalize为站内重置css；
- view：页面模板(模板中采用scale以及按像素、密度改变rem值响应式开发方案)；
### 2.4 src/APPpages ###
    开发多页面应用时，页面独占文件夹。
## 3. 提示 ##
- 3.1 开发模式

  默认设置本地域名，8088端口，自己可以按需改为电脑ip进行本机测试
    
- 3.2 生产构建
  
页面打包之后：根目录dist，并产生css，img，js，views子目录，css，js，html分别打包为其单页面名称，并生成vue库公用js模块vendor。