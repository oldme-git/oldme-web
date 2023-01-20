// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: "utf-8",
            viewport: "width=500, initial-scale=1",
            title: "oldme",
            meta: [
                // { name: "description", content: "My amazing site." }
            ],
        }
    },
    // 别名配置
    alias: {
        "@": "/",
        "assets": "/assets"
    },
    modules: [
    ],
    css: [
        "element-plus/dist/index.css",
        "assets/scss/style.scss"
    ]
})
