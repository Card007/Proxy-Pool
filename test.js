var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('Proxy.db', (err) => {
    if(!err){
        console.log('打开成功')
    } else {
        console.log(err)
    }
})

var allIp = function(callback){
    return db.all('select * from proxy', callback)
}


function ip(){
    allIp((err, response) => {
    console.log(response)
})
}

module.ip = ip
