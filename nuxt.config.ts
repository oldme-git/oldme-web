// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        head: {
            charset: "utf-8",
            viewport: "width=500, initial-scale=1",
            title: "oldme",
            meta: [
                { name: "keywords", content: "oldme博客,PHP,Golang,Web开发,Web前端,Vue,Nginx" },
                { name: "description", content: "oldme的博客，主要用来做IT技术类的知识分享，记录自己的学习历程。主要分享golang，php，vue类的Web知识" },
                { name: "google-site-verification", content: "vfaAygGJ_9dy3PFmV9o7Sk9RWA8N_SIZgRQnyBf925I" },
                { name: "baidu-site-verification", content: "codeva-LZewq1flLA" },
                { name: "msvalidate.01", content: "034634029B6F7E020351137620F010E0" },
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
