## 文件分享助手
随启随用的文件分享助手，不限局域网和外网。一条命令即可启动分享！

![npm](https://img.shields.io/npm/v/ffshare.svg?style=flat-square) ![npm](https://img.shields.io/npm/dm/ffshare.svg?style=flat-square)




#### 安装
```bash
npm i ffshare -g
```

#### 使用步骤
```bash
ffshare D:\movies [port]
```
port可选，默认是3000

#### 注意事项
在windows上面尽量不要设置某个盘的根目录，也不要设置分享系统的目录。否则nodejs很可能没有读取的权限而导致失败。

#### 截图
 ![demo](/screenshot/demo.jpg)