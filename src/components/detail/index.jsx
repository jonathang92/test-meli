import React from 'react';
import './index.scss';
import NumberFormat from 'react-number-format';
import { withRouter } from "react-router-dom";
// import Breadcrumbs from './../breadcrumbs/index';

class Detail extends React.Component{
  // Al momento de cargar consulto a la api por la información solicitada
  componentDidMount() {
    if (this.props.match.params.id !== "") {
      fetch('https://api.mercadolibre.com/items/' + this.props.match.params.id)
      .then(res => res.json())
      .then((data) => {
        this.setState({ data: data });
        fetch('https://api.mercadolibre.com/items/' + this.props.match.params.id +'/description')
        .then(res => res.json())
        .then((data) => {
          this.setState({ description: data });
          fetch('https://api.mercadolibre.com/categories/' + this.state.data.category_id)
          .then(res => res.json())
          .then((data) => {
            console.log(data);
            this.setState({ category: data.name });
          })
          .catch(console.log)
        })
        .catch(console.log)
      })
      .catch(console.log)
    }
  }
  constructor(props) {
    super(props);
    // Declaro data, description y category
    this.state = {data: {}, description: {}, category: "" };
  }

  render(){
    return (
      <div>
        <div className="breadcrumbs">
          {this.state.category}
        </div>
        <div className="detail">
          <div className="product">
            <div className="product-detail">
              <img src={this.state.data.thumbnail} alt="imagen"/>
              <div className="description">
            <span className="description-title">Descripción del producto</span>
            <span className="description-content">{this.state.description.plain_text}</span>
          </div>
            </div>
            <div className="Checkout">
              <span className="quantity"> {this.state.data.condition} - {this.state.data.sold_quantity} vendidos </span>
              <span className="product-title"> {this.state.data.title} </span>
              <span className="price"><NumberFormat value={this.state.data.base_price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$ '} /></span>
              <form action="">
                <button type="submit" className="submit">Comprar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Detail);