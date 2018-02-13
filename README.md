# Example Auth0 App

In this app I am going to show how to implement Auth0 
for your api and app.

The master branch is the before auth0 implementation

The auth0 branch is the after auth0 implementation

---

## Setup

Setting up the backend.

```
cd api 
npm install
// start up a pouchdb server
npm install pouchdb-server -g
pouchdb-server
// create a database called movies
curl -X PUT http://localhost:5984/movies
// create .env and set DB=http://localhost:5984/movies
// load movies
node load-data.js
// start server
yarn start
```

---

Setting up the front end

``` 
cd app
npm install
npm start
```

---

## Having Problems

Post an issue.

## License

MIT



