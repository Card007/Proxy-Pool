# ProxyPool
爬取代理IP并进行测速，筛选出高速可用的ip。

####1.爬取代理ip并进行测速
```javascript
node proxy_pool.js
```

####2.查看优化后的ip
```javascript
node ip_list.js
```

####后续更新：
在爬取代理IP时会先从ip池里寻找可用的ip进行爬取，没有的话才用本身的ip。


![imag](https://github.com/Card007/Proxy-Pool/blob/master/other/ip_proxy.png)
