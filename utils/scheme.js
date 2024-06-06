import {rndInt} from "~/utils/func"

// 颜色盘
const palette = [
  ["#FDFDFD", "#A63B41"],
  ["#FFFDF8", "#F08C4E"],
  ["#FEF5EA", "#C29E64"],
  ["#FAF8F4", "#8BAF56"],
  ["#fcf9f6", "#5BA5B2"],
  ["#EDEDF4", "#8EA4CA"],
  ["#fffbf3", "#7359B1"],
  ["#FFFFF6", "#5D4F57"],
]
const curr = rndInt(0, palette.length-1)

// 主颜色
const m = palette[curr][0]
// 次颜色
const s = palette[curr][1]

export default function () {
// 主题设置，使用不同的颜色
  document.documentElement.style.setProperty("--bg-main", m)
  document.documentElement.style.setProperty("--bg-slave", s)
  document.documentElement.style.setProperty("--c-main", m)
  document.documentElement.style.setProperty("--c-slave", s)
}
