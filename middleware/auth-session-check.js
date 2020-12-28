/**
 * Check if access token is exists in the cookies, redirect page to login if token doesn't exists or expired
 */

import queryString from 'querystring'
import util from './auth-util'
import { env } from '../nuxt.config'

const clientId = env.appId
const responseType = 'token'
const scope = 'read write'
const ignorePath = [ '/app-login', '/app-logout' ]

export default (req, res, next) => {
  const requestUrl = util.getRequestUrl(req)

  // skip session check in these path
  if (ignorePath.includes(requestUrl.pathname)) {
    next()
    return
  }

  // check session with key accessToken
  const accessToken = req.session.accessToken

  // if session is empty redirect to login
  const redirectUri = `${requestUrl.protocol}//${requestUrl.host}/app-login`
  const queryParam = queryString.stringify({
    'client_id': clientId,
    'redirect_uri': redirectUri,
    'response_type': responseType,
    scope,
    'state': queryString.escape(requestUrl.href)
  })
  const loginUrl = `${env.serverUrl}/oauth/authorize?${queryParam}`

  // TODO: check if token still valid
  if (accessToken) {
    next()
    return
  }

  // redirect to login page if no access token in cookies
  util.redirect(res, loginUrl)
}
