import React from 'react';
import './index.scss';
import shipping from './../../assets/ic_shipping.png';
import NumberFormat from 'react-number-format';
import Breadcrumbs from './../breadcrumbs/index';
import queryString from 'query-string';
import { withRouter, Link } from "react-router-dom";
import history from './../../History';

class Results extends React.Component{
  renderItems = () =>  this.state.items.map((contact, i) => {
    return(
          <div className="result" key={i}>
            <div className="photo">
              <Link to={"/items/" + contact.id}>
                <img src={contact.thumbnail} alt="" />
              </Link>
            </div>
            <div className="detail">
              <Link to={"/items/" + contact.id}>
                <div className="price-container">
                  <span className="price">
                    <NumberFormat value={contact.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$ '} />
                  </span>
                  {this.freeShipping(contact.shipping.free_shipping)}
                </div>
                <span className="description">
                  {contact.title}
                </span>
              </Link>
            </div>
            <div className="city">
                <span>{contact.address.state_name}</span>
            </div>
          </div>
    )})
  
  constructor(props) {
    super(props);
    this.state = {items: [], filters: []};
    this.renderItems = this.renderItems.bind(this);
  }
  freeShipping(free) {
    if (free) {
      return <img src={shipping} alt="Free Shipping"/>;
    }
    return "";
  }
  loadData() {
    if (this.props.location.search !== "") {
      
      let parse = queryString.parse(this.props.location.search);
      if (parse.search) {
        fetch('https://api.mercadolibre.com/sites/MLA/search?limit=4&q=' + parse.search)
        .then(res => res.json())
        .then((data) => {
          this.setState({ items: data.results })
          this.setState({ filters: data.filters })
        })
        .catch(console.log)
      } else {
        history.push(`/`);
      }
    } else {
      history.push(`/`);
    }
  }
  lastSearch = "";
  render() {
    if (this.lastSearch !== this.props.location.search) {
      this.lastSearch = this.props.location.search;
      this.loadData();
    }
      return (
        <div>
          <Breadcrumbs filters = {this.state.filters}/>
          <div className="results">
            {this.renderItems()}
          </div>
        </div>
      );
  }
}

export default withRouter(Results);