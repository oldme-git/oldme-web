// 阿拉伯数字转中文
export function arabToChinese(section) {
  let chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
  let chnUnitChar = ["", "十", "百", "千", "万", "亿", "万亿", "亿亿"]
  let strIns = "", chnStr = ""
  let unitPos = 0
  let zero = true
  while (section > 0) {
    let v = section % 10
    if (v === 0) {
      if (!zero) {
        zero = true
        chnStr = chnNumChar[v] + chnStr
      }
    } else {
      zero = false
      strIns = chnNumChar[v]
      // Add this logic to remove "一" before "十" if the number is between 10 and 20
      if (unitPos === 1 && v === 1 && chnStr !== "") {
        strIns = ""
      }
      strIns += chnUnitChar[unitPos]
      chnStr = strIns + chnStr
    }
    unitPos++
    section = Math.floor(section / 10)
  }
  return chnStr
}

// 取范围的随机整数
export function rndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}
