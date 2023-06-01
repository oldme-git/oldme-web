// 开发环境请求地址
const dev = "http://127.0.0.1:8000"
// 正式环境请求地址
const pro = "https://api.oldme.net"

let api = process.env.NODE_ENV === "development" ? dev : pro

export default api
