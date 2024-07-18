import {rndInt} from "~/utils/func"

// 颜色盘
const palette = [
  ["#FDFDFD", "#A63B41"],
  ["#FFFDF8", "#F49227"],
  ["#FEF5EA", "#C29E64"],
  ["#EDEDED", "#6B8770"],
  ["#FCF9F6", "#5BA5B2"],
  ["#EDEDF4", "#8EA4CA"],
  ["#FAF9F9", "#7C739F"],
  ["#F5F2E9", "#86908A"],
]

// 导出调色板
export {palette}

// 默认主题设置，使用随机的颜色
export default function () {
  const curr = rndInt(0, palette.length-1)
  setTheme(curr)
}

export function setTheme(index) {
  // 主颜色
  const m = palette[index][0]
  // 次颜色
  const s = palette[index][1]
  document.documentElement.style.setProperty("--bg-main", m)
  document.documentElement.style.setProperty("--bg-slave", s)
  document.documentElement.style.setProperty("--c-main", m)
  document.documentElement.style.setProperty("--c-slave", s)
}
