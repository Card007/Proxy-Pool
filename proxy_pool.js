var request = require('request')
var cheerio = require('cheerio')
var fs = require('fs')

var IpProxy = function(){
    this.ip = 0
    this.port = 0
    this.http = ''
}

var ips = new IpProxy()

var cleanN = function(l){
    var list = []
    for (let i = 0; i < l.length; i++) {
        if(l[i] === '' || l[i] === '\n'){
        }else{
            list.push(l[i].replace('\n',''))
        }
    }
    ips.ip = list[1]
}

var readProxy = function(){
    fs.readFile('proxy.txt', function(err, data){
        var l = []
        if(err === null){
            var e = cheerio.load(JSON.parse(data))
            e('tr').each(function(i, elem){
                l[i] = e(this).text()
            })
            for (let i = 1; i < 2; i ++){
                cleanN(l[i].split(' '))
            }
        }
    })
}

var whriteProxy = function(e){
    var response = JSON.stringify(e)
    fs.writeFile('proxy.txt', response,function(err){
        if (err === null){
            console.log('保存成功')
        } else {
            console.log('保存失败' ,err)
        }
    })
}

var requestProxy = function(options){
    request(options, function(err, response, body){
        if(err === null && response.statusCode === 200){
            whriteProxy(body)
        } else {
            console.log('链接失败')
        }
    })
}

var proxyPool = function(options){
    fs.readFile('proxy.txt' , function(err, data){
        if (err != null){
           requestProxy(options)
        } else {
           whriteProxy(data)
        }
    })
}

var __main = function(){

    var useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'

    var headers = {
        'User-Agent': useragent,
    }

    var url = 'http://www.xicidaili.com/nn/'
    var options = {
        url,
        headers,
    }

    readProxy()
}

__main()

console.log(ips)