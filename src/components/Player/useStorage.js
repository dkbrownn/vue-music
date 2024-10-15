// 保存本地数据
export function save (key, data) {
  if (data.length > 100) {
    data = data.slice(data.length - 100)
  }
  localStorage.setItem(key,JSON.stringify(data))
}
export function get (key) {
  return JSON.parse(localStorage.getItem(key))
} 