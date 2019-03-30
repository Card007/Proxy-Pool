# ProxyPool
爬取代理IP并进行测速，筛选出高速可用的ip。

更新内容：将代理池模块化，可以在项目中直接调用。

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
var proxy = require('./proxy_pool.js')

//主程序，爬取ip+检查ip
var proxys = proxy.__main

//不爬取，只检查数据库里现有的ip
var check = proxy.check

//提取所有ip
var ips = proxy.ips
//ips接收一个处理函数，然后向这个函数传递两个参数，一个为错误信息，另一个为返回内容
ips((err,response)=>{
    console.log(response)
})
```


后续更新：
1.在爬取代理IP时会先从ip池里寻找可用的ip进行爬取，没有的话才用本身的ip。
2.加入更多代理ip源


![imag](https://github.com/Card007/Proxy-Pool/blob/master/other/ip_proxy.png)
