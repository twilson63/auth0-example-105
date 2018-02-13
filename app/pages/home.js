// @format
import React from 'react'
import { Subscribe } from 'unstated'
import { map } from 'ramda'
import Store from '../store'
import { Link } from 'react-router-dom'

const li = movie => <li key={movie.imdbID}>{movie.Title}</li>

export default () => (
  <Subscribe to={[Store]}>
    {store => {
      return (
        <React.Fragment>
          <header>
            <Link
              className="ma2 pa2 ba br2 link bg-gray white avenir fr"
              to="/logout"
            >
              Logout
            </Link>
            <h1>{store.state.title}</h1>
          </header>
          <main>
            <form
              onSubmit={e => {
                e.preventDefault()
                store.search(store.state.criteria)
              }}
            >
              <input
                type="text"
                value={store.state.criteria}
                onChange={e => store.changeCriteria(e.target.value)}
              />
              <button>Search</button>
            </form>
            <ul>{map(li, store.state.movies)}</ul>
          </main>
        </React.Fragment>
      )
    }}
  </Subscribe>
)
