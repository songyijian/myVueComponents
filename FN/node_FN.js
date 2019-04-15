
/*
node.js 简单的获取命令参数

λ node server.js --name=ajanuw --post=14
let a = new Argvs();
console.log( a.argvsAll); // [ { name: 'ajanuw' }, { post: '14' } ]
console.log( a.argvsGet('name')); // ajanuw
console.log( a.argvsGet('post')); // 14
console.log( a.argvsKeys()); // [ 'name', 'post' ]
console.log( a.argvsHas('name')); // true
*/

class Argvs {
  constructor() {
    this.argvsAll = this.argvsAll();
  }
  argvsAll() {
    return process.argv.slice(2).reduce((acc, item) => {
      item = item.split(/=/);
      const [k, v] = [item[0].replace(/-/gi, ''), item[1]];
      acc.push({
        [k]: v
      });
      return acc;
    }, [])
  }

  argvsGet(k) {
    return this.argvsAll.reduce((acc, item) =>
      acc ?
      acc :
      (k in item) ?
      acc = item[k] :
      acc, false)
  }

  argvsKeys(argvsAll) {
    if(!argvsAll) argvsAll = this.argvsAll;
    return argvsAll.reduce((acc, item) =>{
      return [...acc, ...Object.keys(item)]
    }, [])
  }
  argvsHas(k){
    return Object.is(this.argvsKeys().indexOf(k), -1) ? false : true;
  }
}



/*
  获取本地
  return {str } //127.0.0.1
*/
function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}



/**
获取用户的ip
@return {str } ::ffff:10.130.148.222
*/
function getClientIp(req) {
  var ip = req.headers['x-forwarded-for'] ||
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress || '';
  if (ip.split(',').length > 0) {
    ip = ip.split(',')[0]
  }
  return ip
}
