//涉及到跨域，以下配置文件拦截并转发
let proxyObj = {};
proxyObj['/'] = {
    //websocket关闭
    ws: false,
    //拦截到的请求转发到以下地址
    target: 'http://localhost:8081',
    changeOrigin: true,
    pathRewrite: {
        //拦截到的地址不去修改，是什么就是什么样
        '^/': ''
    }
}
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    }
}