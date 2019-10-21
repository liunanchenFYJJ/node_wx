var Koa = require('koa');
var sha1 = require('sha1');
const config = {
    wechat: {
        appID: 'wxea78b5a2520c64b2', // 果仔
        appSecret: '671c76ece23c5055d8c12067071c22b0',
        token: 'cln314214',
    }
}

var app = new Koa();

app.use(async (ctx) => {
    var token = config.wechat.token;
    const {signature, timestamp, nonce, echostr} = ctx.query;

    var str = [token, timestamp, nonce].sort().join('');
    var sha1Str = sha1(str);
    if (signature === sha1Str) {
        return ctx.body = echostr;
    } else {
        ctx.body = 'wrong';
    }
})

app.listen(3200);
console.log('Listening...');