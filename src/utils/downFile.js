import { get } from '@/utils/storage'

export default (id) => {
  const token = get('token') || ''
  const link = document.createElement('a')
  link.href = `${process.env.VUE_APP_BASE_API}/file/download?id=${id}&token=${token}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
