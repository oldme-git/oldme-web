function nuxt() {
  return document.getElementById("__nuxt")
}

function body() {
  return document.getElementById("body")
}

function iconOpen() {
  return document.getElementById("side-i-open")
}

function iconClose() {
  return document.getElementById("side-i-close")
}

function main() {
  return document.getElementById("main")
}

function side() {
  return document.getElementById("sidebar")
}

export function open() {
  nuxt().style.overflowX = "auto"
  body().style.height = "92rem"
  iconOpen().style.display = "none"
  iconClose().style.display = "block"
  main().setAttribute("class", "main main-open")
  side().setAttribute("class", "sidebar sidebar-open")
}

export function close(e) {
  nuxt().style.overflowX = "hidden"
  body().style.height = "auto"
  iconOpen().style.display = "block"
  iconClose().style.display = "none"
  main().setAttribute("class", "main main-close")
  side().setAttribute("class", "sidebar sidebar-close")
  if (e !== undefined) {
    setTimeout(() => {
      const dom = e.target
      const idName = dom.getAttribute("data-title").match(/title-[\d-]+/g)
      const title = document.getElementById(idName[0])
      const top = title.offsetTop
      window.scroll({
        top,
        behavior: 'smooth'
      })
    }, 300)
  }
}
