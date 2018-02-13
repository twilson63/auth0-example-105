// @format

require('dotenv').config()
require('isomorphic-fetch')
const express = require('express')
const app = express()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
const cors = require('cors')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

const db = PouchDB(
  `https://${process.env.KEY}:${process.env.SECRET}@tomw63.roo.land/movies`
)
const { pluck } = require('ramda')

app.use(cors())

app.use(
  jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://twilson63.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://api.movies.com',
    issuer: 'https://twilson63.auth0.com/',
    algorithms: ['RS256']
  })
)

app.get('/', (req, res) => {
  res.send({ name: 'movie api' })
})

app.get('/movies', async (req, res) => {
  const results = await db
    .allDocs({ include_docs: true })
    .then(res => pluck('doc', res.rows))
    .catch(err => console.log(err))
  res.send(results)
})

app.listen(5000)
