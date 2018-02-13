// @format
import React from 'react'
import { Subscribe } from 'unstated'
import { map } from 'ramda'
import Store from '../store'

const li = movie => <li key={movie.imdbID}>{movie.Title}</li>

export default () => (
  <Subscribe to={[Store]}>
    {store => {
      return (
        <React.Fragment>
          <header>
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
