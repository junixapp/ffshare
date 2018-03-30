'use strict'

async function success(res, data) {
    res.json({
        code: 0,
        msg: 'success',
        data: data
    })
}
async function error(res, msg) {
    res.json({
        code: -1,
        msg: msg,
        data: null
    })
}

function exitMsg(msg) {
    console.error(`${msg}
==========================================================    
    正确命令，例如：ffshare D:/XXX [port]
==========================================================        
文件服务程序已退出，请重试！
    `);
    process.exit()
}

module.exports = {
    success, error, exitMsg
}