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
            link: [
                {
                    rel: "stylesheet",
                    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                },
            ]
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
        // "element-plus/dist/index.css",
        "assets/scss/app.scss"
    ]
})
