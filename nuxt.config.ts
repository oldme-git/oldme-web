// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
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
                        href: "https://cdn.bootcdn.net/ajax/libs/font-awesome/6.2.1/css/all.min.css"
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
    ],
})
