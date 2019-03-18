var request = require('request')
var cheerio = require('cheerio')
var fs = require('fs')

//实现爬取分析功能
//接下来是数据库和去除不能用的ip

//提取优化文件数据
var clearN = function(l){
    var index = 0
    for (let i = 0; i < l.length; i++) {
        if(l[i] === '' || l[i] === '\n'){
        }else{
            var ips = l[i].replace('\n','')
            if (index === 0){
                var ip = ips
                console.log('爬取ip' + ip)
            } else if(index === 1){
                var port = ips
            } else if(index === 4){
                var http = ips
            }
            index += 1
        }
    }
    var proxy = {
        ip,
        port,
        http,
    }
    return proxy
}

//分析网页内容
var loadHtml = function(data){
    var l = []
    var ipList = []
    var e = cheerio.load(data)
    e('tr').each(function(i, elem){
        l[i] = e(this).text()
    })
    for (let i = 1; i < l.length; i ++){
        ipList.push(clearN(l[i].split(' ')))
    }
    whriteProxy('ip.txt',JSON.stringify(ipList))
}

//读取文件
var readProxy = function(path, callback){
    fs.readFile(path, callback)
}

//保存文件
var whriteProxy = function(name ,e){
    var response = JSON.stringify(e)
    fs.appendFile(name, response,function(err){
        if (err === null){
            console.log('保存成功')
        } else {
            console.log('保存失败' ,err)
        }
    })
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

//判断数据文件是否存在，然后决定要不要联网获取内容（测试阶段用）
var proxyPool = function(options){
    fs.readFile('proxy.txt' , function(err, data){
        if (err != null){
           requestProxy(options)
        } else {
           whriteProxy('proxy.txt', data)
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
   
    for (let i = 1; i < 10; i++) {
        url = options.url + i
        requestProxy(options)
    }
}

var __main = function(){
    ipUrl()

    // readProxy('ip.txt', function(err, data){
    //     var l = JSON.parse(data)
    //     console.log(l.length)
    // })
}

__main()