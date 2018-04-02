import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
import PokemonIndexList from './components/PokemonIndexList';
import PokemonModal from './components/PokemonModal';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      activePage: 1,
      limit: 50,
      offset: 0,
      totalPages: 0,
      count: 0,
      loaded: false,
      showModal: false,
      selectedPokemon: null
    };
    this.loadPokemon = this.loadPokemon.bind(this);
    this.handlePaginationSelect = this.handlePaginationSelect.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
}
/*This will fetch the api
it takes a promise
that returns the json file
see npm whatwg-fetch docs for pattern
*/
loadPokemon(url) {
  fetch(url)
    .then(response => {
      return response.json();
    }).then(json => {
      let pages = Math.round(json.count / this.state.limit);
      this.setState({
        pokemon: json.results,
        totalPages: pages,
        count: json.count,
        loaded: true
      });
      console.log(this.state)
    }).catch(err => {
      console.log(err)
    })
}
/*We want this to fetch as the person opens the page
before the componenet mounts */

componentWillMount() {
  this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=${this.state.offset}`);
}

handlePaginationSelect(selectedPage) {
  console.log(selectedPage);
  let offset = this.state.limit * selectedPage;
  this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=${offset}`);
  this.setState({
    activePage: selectedPage
  })
}

handleLimitChange(event) {
  this.setState({
    // the + at the start of a string that is a number, converts to a number +'5' will be 5
    limit: +event.target.innerHTML || this.state.count,
    activePage: 1
  }, () => {
    this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=0`);
  })
}

handleModalOpen(pokemon) {
  console.log(pokemon.name)
  if(pokemon.url !== undefined) {
    fetch(`${pokemon.url}`)
      .then(response => {
        return response.json()
      }).then(json => {
        this.setState({
          selectedPokemon: json,
          showModal: true
        })
      }).catch(ex => {
        console.log('parsing failed', ex)
      })
  }
}

handleModalClose() {
  this.setState({
    showModal: false
  });
}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Pokemon App By Todd</h2>
        </div>

        {this.state.loaded ? null : 'Loading...'}
        <PokemonIndexList
          display={this.state.loaded}
          options={[10,50,100,200]}
          selectedValue={this.state.limit}
          allValue={this.state.count}
          onOptionSelected={this.handleLimitChange}
          listOfPokemon={this.state.pokemon}
          bsSize='small'
          items={this.state.totalPages}
          activePage={this.state.activePage}
          onSelect={this.handlePaginationSelect}
          totalPages={this.state.totalPages}
          openModal={this.handleModalOpen}
        />

        <PokemonModal
          closeModal={this.handleModalClose}
          showModal={this.state.showModal}
          pokemon={this.state.selectedPokemon}
        />

      </div>
    );
  }
}

export default App;
