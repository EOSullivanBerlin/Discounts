import React, { Component } from 'react';
import './App.css';
import DiscountDisplay from './components/DiscountDisplay';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {
        "id": "2",
        "customer-id": "2",
        "items": [
          {
            "product-id": "B102",
            "quantity": "5",
            "unit-price": "4.99",
            "total": "24.95"
          }
        ],
        "total": "24.95"
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="Discount">
        </header>
        <p className="App-intro">
          Hello
        </p>
        <DiscountDisplay
        order={this.state.order}
        />
      </div>
    );
  }
}

export default App;
