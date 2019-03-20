var sqlite3 = require('sqlite3')
var request = require('request')

// var db = new sqlite3.Database('Proxy.db', (err) => {
//     if(err){
//         console.log('打开出错')
//     } else {
//         console.log('打开成功')
//     }
// })

// var allIp = function(callback){
//     return db.all('select * from proxy', callback)
// }

// allIp((err,response) => {
//     for (let i = 0; i < response.length; i++) {
//         console.log(response[i])
//     }
// })

var proxys = [{
    type:"HTTP",
    ip:'123.158.33.37',
    port:8118,
}]

function check(){
    let index = proxys.length

    var useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'

    var headers = {
        'User-Agent': useragent,
    }
    return new Promise((resolve, reject) => {
        for (let i = 0; i < index; i++) {
            let proxy = proxys[i]
            request({
                url:'http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js',
                proxy: `${proxy.type.toLowerCase()}://${proxy.ip}:${proxy.port}`,
                method:'GET',
                timeout: 1000,
                headers,}
                ,function(err, response,body){
                    if(!err && response.statusCode == 200){
                        console.log(proxy.ip+' 链接成功：')
                        console.log(body)
                    } else {
                        console.log(proxy.ip+' 链接失败')
                    }

                }
            )
        }
    }).catch((err)=>{
        console.log(err)
    })
}

check()

// sql.run("create table proxy(ip char(15), port char(15))",(err) => {
//     if(!err){
//         console.log('创建成功')
//     } else {
//         console.log('创建失败')
//         console.log(err)
//     }
// })
// sql.run("insert into proxy values ('127.0.0.1')",(err) => {
//     if(!err){
//         console.log('添加成功')
//     } else {
//         console.log(err)
//     }
// })

// sql.all('select * from proxy',(err,response) => {
//     if(!err){
//         console.log(response)
//     }
// })