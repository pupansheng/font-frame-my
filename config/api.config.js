const isPro = Object.is(process.env.NODE_ENV, 'production')

const  isDebug=true;//debug模式 网络请求将会打印
const  isJwt=false;//开启jwt登录模式  注意需要后端配合

module.exports = {
  baseUrl: isPro ? 'api/' : 'http://localhost:20000/pps',
  isDebug:isDebug,
  isJwt:isJwt
}
