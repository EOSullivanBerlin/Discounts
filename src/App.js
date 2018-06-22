import React, { Component } from 'react';
import './App.css';
import DiscountDisplay from './components/DiscountDisplay';
import DiscountFunctions from './discountFunctions/DiscountFunctions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {
        'id': '1',
        'customer-id': '1',
        'items': [
          {
            'id': 'A101',
            'quantity': '6',
            'unit-price': '9.75',
            'total': '58.50',
          },
          {
            'id': 'B103',
            'quantity': '2',
            'unit-price': '12.95',
            'total': '25.90',
          },
          {
            "id": "B102",
            "quantity": "10",
            "unit-price": "4.99",
            "total": "49.90"
          },
        ],
        'total': '134.30',
      },
      customer: {
        "id": "2",
        "name": "Teamleader",
        "since": "2015-01-15",
        "revenue": "1505.95"
      },
    }
  }

  handleDiscounts(order, customer) {
    let result = DiscountFunctions.Discounter(order, customer);
    return result.discounts;
  }

  render() {
    return (
      <div className="App">
        <header className="Discount">
        </header>
        <p className="App-intro">
        </p>
        <DiscountDisplay
        order={this.state.order}
        customer={this.state.customer}
        Discount={this.handleDiscounts.bind(this)}
        />
      </div>
    );
  }
}

export default App;
