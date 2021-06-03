export function get(key) {
  const value = window.localStorage.getItem(key)
  if (value !== 'undefined') {
    return JSON.parse(value)
  }
}
export function set(key, token) {
  return window && window.localStorage.setItem(key, JSON.stringify(token))
}
export function remove(key) {
  return window && window.localStorage.removeItem(key)
}
export function clearAll() {
  return window && window.localStorage.clear()
}
