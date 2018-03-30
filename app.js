#!/usr/bin/env node
'use strict'
const helper = require('./helper')
let args = process.argv.slice(2, 4)

//1. check folder
let root = args[0]
if (!root) {
    helper.exitMsg('命令错误：缺少要分享的目录名！')
    process.exit()
}

//2. check port
let PORT = 3000
if (args[1]) {
    let portReg = /^[\d]{2,5}$/
    if(portReg.test(args[1])){
        PORT = args[1]
    }
}

const fse = require('fs-extra')
const fs = require('fs')
// 检查是否是目录
const rootStat = fse.statSync(root)
if (rootStat.isFile()) {
    helper.exitMsg(`目录错误：必须设置一个有效的目录，【${root}】是一个文件！`)
    process.exit()
}


const path = require('path')
const express = require('express');
const app = express();

const ApiRequestReg = /^\/api\/(.*)/
// serve the index.html
app.use(express.static('static'));
app.use(express.static(root));
app.use(function (req, res, next) {
    // console.log(req.url);
    if (!ApiRequestReg.test(req.url) && req.url !== '/') {
        res.redirect('/');
        return
    }
    next();
});


app.get(ApiRequestReg, async function (req, res) {
    try {
        const param = req.params[0]
        let targetFile = path.join(root, param)
        const stat = await fs.statSync(targetFile)
        if (stat.isDirectory()) {
            const files = await fse.readdir(targetFile)
            helper.success(res, files.map((f) => {
                let p = path.join(param, f)
                let fstat = fs.statSync(path.join(root, p))
                if (fstat.isFile()) {
                    //set full path
                    p = `http://127.0.0.1:${PORT}/${p}`
                }
                return {
                    name: f,
                    path: p,
                    isdir: fstat.isDirectory(),
                    size: fstat.size,
                    birthtime: fstat.birthtime,
                    mtime: fstat.mtime
                }
            }))
        }
    } catch (e) {
        console.log(e);
        helper.error(res, e.toString())
    }
});

app.listen(PORT)
console.log(`ffshare文件分享服务已启动。
正在分享的文件目录为：${root}

=====================================================================================================
    请在浏览器访问：http://127.0.0.1:${PORT}
=====================================================================================================

`);