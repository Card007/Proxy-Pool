# ProxyPool
爬取代理IP并进行测速，筛选出高速可用的ip。

**0.安装方式**

有两种安装方式，一种直接通过npm安装，然后直接跳到第四步：
```javascript
npm install ip-proxy-pool
```
或者通过git下载：

**1.在目录下运行，安装依赖包**
```javascript
npm install
```

**2.爬取代理ip并进行测速检查**
```javascript
node main.js
```

**3.只检查数据库里现有的ip**
```javascript
node check.js
```

**4.如何在项目里使用代理池**
```javascript
//导入本地模块
const proxy = require('./proxy_pool.js')
//如果通过npm安装
//var proxy = require('ip-proxy-pool')

//主程序，爬取ip+检查ip
const proxys = proxy.run

//不爬取，只检查数据库里现有的ip
const check = proxy.check

//提取所有ip
const ips = proxy.ips
//ips接收一个处理函数，然后向这个函数传递两个参数，一个为错误信息，另一个为数据库里的所有ip
ips((err,response)=>{
    console.log(response)
})
```


后续更新：
1.在爬取代理IP时会先从ip池里寻找可用的ip进行爬取，没有的话才用本身的ip。
2.加入更多代理ip源


![imag](https://github.com/Card007/Proxy-Pool/blob/master/other/ip_proxy.png)
