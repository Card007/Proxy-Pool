var request = require('request')
var cheerio = require('cheerio')
var sqlite3 = require('sqlite3')

//实现爬取分析功能
//接下来是数据库和去除不能用的ip

var db = new sqlite3.Database('Proxy.db', (err) => {
    if(!err){
        console.log('打开成功')
    } else {
        console.log(err)
    }
})

db.run('CREATE TABLE proxy(ip char(15), port char(15), type char(15))',(err) => {})

//添加数据文件
var insertDb = function(ip, port, type){
    db.run("INSERT INTO proxy VALUES(?, ?, ?)",[ip,port,type])
}

//提取优化文件数据
var clearN = function(l){
    var index = 0
    for (let i = 0; i < l.length; i++) {
        if(l[i] === '' || l[i] === '\n'){
        }else{
            var ips = l[i].replace('\n','')
            if (index === 0){
                var ip = ips
                console.log('爬取ip:' + ip)
            } else if(index === 1){
                var port = ips
            } else if(index === 4){
                var type = ips
            }
            index += 1
        }
    }
    insertDb(ip, port, type)
}

//分析网页内容
var loadHtml = function(data){
    var l = []
    var e = cheerio.load(data)
    e('tr').each(function(i, elem){
        l[i] = e(this).text()
    })
    for (let i = 1; i < l.length; i ++){
        clearN(l[i].split(' '))
    }
}

//链接网络
var requestProxy = function(options){
    request(options, function(err, response, body){
        if(err === null && response.statusCode === 200){
            loadHtml(body)
        } else {
            console.log('链接失败')
        }
    })
}

var ipUrl = function(){
    var useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'

    var headers = {
        'User-Agent': useragent,
    }

    var options = {
        url:'http://www.xicidaili.com/nn/',
        headers,
    }
   
    for (let i = 1; i <= 10; i++) {
        url = options.url + i
        requestProxy(options)
    }
}

var __main = function(){
    ipUrl()
}

__main()