# Visual Studio Code

## 什么是VS Code

VSCode（Visual Studio Code）是微软推出的一款免费、开源且跨平台的代码编辑器，它凭借其轻量级的设计、强大的核心功能以及海量扩展插件生态系统，能够轻松支持几乎所有编程语言的开发，成为了从初学者到专业开发者都极为喜爱的“全能型”现代开发工具。<span style="color: #888">（该内容由deepseek生成）</span>


## 安装VS Code

进入官网：<https://code.visualstudio.com>，点击Download for Windows开始下载。打开下载的exe文件进行安装，所有选项使用默认勾选即可，这里不做赘述。同样不要将软件安装在C盘，可以和Anaconda并列装在同一个存放软件的目录下。

<div class="gallery">
  <div class="gallery-item" data-src="../1.png" data-caption="官网下载">
    <img src="../1.png" alt=data-caption>
    <div class="caption">官网下载</div>
  </div>
  <div class="gallery-item" data-src="../2.png" data-caption="开始安装">
    <img src="../2.png" alt=data-caption>
    <div class="caption">开始安装</div>
  </div>
</div>

## 配置VS Code

### 设置语言为中文

页面默认语言为英文，可以通过安装中文插件的方式切换到中文。

点击左侧栏插件选项（图中左侧栏高亮图标），在搜索框中搜索Chinese，点击install。 按下Ctrl+Shift+P，上方会显示命令面板，然后键入Configure Display Language命令。回车，选择中文。重启应用，页面将以中文显示。

### 安装Python插件

在插件页面（图中左侧栏高亮图标）搜索python并下载安装即可。安装完成后记得重启软件。


<div class="gallery">
  <div class="gallery-item" data-src="../3.png" data-caption="安装中文语言插件">
    <img src="../3.png" alt=data-caption>
    <div class="caption">安装中文语言插件</div>
  </div>
  <div class="gallery-item" data-src="../4.png" data-caption="安装Python插件">
    <img src="../4.png" alt=data-caption>
    <div class="caption">安装Python插件</div>
  </div>
  <div class="gallery-item" data-src="../5.png" data-caption="点击Configure Display Language">
    <img src="../5.png" alt=data-caption>
    <div class="caption">点击Configure Display Language</div>
  </div>
</div>

## 在VS Code下激活conda环境

按下Ctrl+Shifit+P，在上方命令面板中搜索“选择解释器”，点击“Python：选择解释器”，然后选择自己需要的python环境。接下来在vscode中所运行的程序可以调用该环境中所安装的python依赖包。

<div class="gallery">
  <div class="gallery-item" data-src="../6.png" data-caption="Python：选择解释器">
    <img src="../6.png" alt=data-caption>
    <div class="caption">Python：选择解释器</div>
  </div>
  <div class="gallery-item" data-src="../7.png" data-caption="选择想要使用的环境">
    <img src="../7.png" alt=data-caption>
    <div class="caption">选择想要使用的环境</div>
  </div>
</div>
## 创建并运行python程序

点击左上方文件，点击打开文件夹，选择我们刚才创建的项目文件夹。在下方工作区中选中文件夹，点击新建文件按钮（图二橙色箭头），输入文件名加后缀（.py)，图中创建的是名为test.py的python文件。创建完后打开，在左侧输入代码后点击右上方的小三角运行（图三红色箭头），结果会出现在下方的控制台中。

<div class="gallery">
  <div class="gallery-item" data-src="../8.png" data-caption="选择项目文件夹">
    <img src="../8.png" alt=data-caption>
    <div class="caption">选择项目文件夹</div>
  </div>
  <div class="gallery-item" data-src="../9.png" data-caption="新建文件">
    <img src="../9.png" alt=data-caption>
    <div class="caption">新建文件</div>
  </div>
  <div class="gallery-item" data-src="../10.png" data-caption="运行代码">
    <img src="../10.png" alt=data-caption>
    <div class="caption">运行代码</div>
  </div>
</div>

接下来就可以愉快地写代码了！

之后python的学习和编写都可以在vscode中进行了。



