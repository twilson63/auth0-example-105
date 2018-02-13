require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-upsert'))

const db = PouchDB(
  `https://${process.env.KEY}:${process.env.SECRET}@tomw63.roo.land/movies`
)

db
  .upsert('1993-groundhog-day', doc => {
    return require('./data/groundhog-day.json')
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))

db
  .upsert('1984-ghostbusters', doc => {
    return require('./data/1984-ghostbusters.json')
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
