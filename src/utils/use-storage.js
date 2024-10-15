export function saveLocal (key,data) {
  if (data.length > 10) {
    data = data.slice(data.length - 10)
  }
  localStorage.setItem(key, JSON.stringify(data))
}
export function getLocal (key) {
  return JSON.parse(localStorage.getItem(key))
}