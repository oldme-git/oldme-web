// 开发环境请求地址
const dev = "http://api.oldmedev.top"
// 正式环境请求地址
const pro = "https://api.oldme.net"

let api = process.env.NODE_ENV === "development" ? dev : pro

export default api
