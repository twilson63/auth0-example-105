// @format
import 'isomorphic-fetch'
import { Container } from 'unstated'

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
    fetch('http://localhost:5000/movies')
      .then(res => res.json())
      .then(movies => {
        this.setState({ movies })
      })
  }
}

export default Store
