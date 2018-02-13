import auth0 from 'auth0-js'
import history from './history'
import { __, has, and, map } from 'ramda'

export default function() {
  const a0 = new auth0.WebAuth({
    domain: 'twilson63.auth0.com',
    clientID: 'MHxQ864tWML2hKIoG6at2O6GNVA7u31P',
    redirectUri: 'http://localhost:4000/callback',
    audience: 'https://api.movies.com',
    responseType: 'token id_token',
    scope: 'openid'
  })

  const setSession = authResult => {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    const setItem = ([key, value]) => localStorage.setItem(key, value)

    map(setItem, [
      ['access_token', authResult.accessToken],
      ['id_token', authResult.idToken],
      ['expires_at', expiresAt],
      ['sub', authResult.idTokenPayload.sub]
    ])
    history.replace('/')
  }

  const handleAuthentication = () => {
    a0.parseHash((err, authResult) => {
      const has2 = has(__, authResult)
      if (err) return console.log(err)
      if (and(has2('accessToken'), has2('idToken'))) {
        setSession(authResult)
        history.replace('/')
      }
    })
  }

  const login = () => {
    a0.authorize()
  }

  const logout = () => {
    const rm = k => localStorage.removeItem(k)
    map(rm, ['access_token', 'id_token', 'expires_at', 'sub'])
  }

  const isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  const getToken = () => {
    return localStorage.getItem('access_token')
  }

  return {
    handleAuthentication,
    login,
    logout,
    getToken,
    isAuthenticated
  }
}
