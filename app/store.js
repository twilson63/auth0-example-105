// @format
import 'isomorphic-fetch'
import { Container } from 'unstated'
import auth from './auth'

const session = auth()

class Store extends Container {
  state = {
    title: 'Favorite Movies',
    criteria: '',
    movies: []
  }
  changeCriteria = criteria => {
    this.setState({ criteria })
  }
  search = () => {
    const token = session.getToken()
    fetch('http://localhost:5000/movies', {
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(movies => {
        this.setState({ movies })
      })
  }
}

export default Store
