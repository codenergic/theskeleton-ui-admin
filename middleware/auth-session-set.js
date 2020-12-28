/**
 * Parse token from query string, then store in cookies
 */

import queryString from 'querystring'
import util from './auth-util'

export default (req, res, next) => {
  const requestUrl = req.url
  const tokenPayload = requestUrl.indexOf('?') > 0 ?
    queryString.parse(requestUrl.substring(requestUrl.indexOf('?') + 1)) : {}

  // url doesn't contains access token query string
  if (!tokenPayload.access_token) {
    next()
    return
  }

  // set session
  req.session.accessToken = tokenPayload.access_token
  req.sessionOptions.maxAge = parseInt(tokenPayload.expires_in) * 1000
  req.sessionOptions.httpOnly = false // make it accessible to javascript

  // redirect to original request url
  const redirectUrl = queryString.unescape(tokenPayload.state)
  util.redirect(res, redirectUrl)
}
