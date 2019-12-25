import React from 'react';
import './index.scss';
import logo from './../../assets/Logo_ML.png';
import search from './../../assets/ic_Search.png';
import { Link } from 'react-router-dom';
import history from './../../History';
class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  // capturo el cambio en el input
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  // submit del formulario
  handleSubmit(event) {
    if(this.state.value !== ""){
      // hago un push de la busqueda a la ruta
      history.push(`/items?search=${this.state.value}`);
    } 
    event.preventDefault();
  }
  render() {
    return (
      <div className="Header">
        <header className="App-header">
          <div className="center-seach">
            <Link to="/">
              <img src={logo} className="App-logo" alt="logo"/>
            </Link>
            <form action="" className="search-box" onSubmit={this.handleSubmit}>
              <input type="text" value = {this.state.value} placeholder="Nunca dejes de buscar"  onChange={this.handleChange} />
              <button type="submit">
              <img src={search} alt="buscar" />
              </button>
            </form>
          </div>
        </header>
      </div>
    ); 
  }
}

export default Header;