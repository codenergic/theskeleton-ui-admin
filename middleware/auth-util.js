import url from 'url'

export default {
  getRequestUrl (req) {
    const headers = req.headers
    const scheme = headers['x-forwarded-proto'] || 'http'

    return url.parse(`${scheme}://${headers.host}${req.url}`)
  },
  redirect (res, url) {
    res.writeHead(302, { 'Location': url })
    res.end()
  }
}
