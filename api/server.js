// @format

require('dotenv').config()
require('isomorphic-fetch')
const express = require('express')
const app = express()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
const cors = require('cors')

const db = PouchDB(
  process.env.DB
)
const { pluck } = require('ramda')

app.use(cors())

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
