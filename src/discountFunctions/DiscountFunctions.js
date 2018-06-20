var DiscountFunctions = {

  CategoryCounter(order, category) {
    let amount = 0;
    for(let i = 0; i < order.items.length; i ++) {
      if(this.isCategory(order, category, i)) {
        amount += parseInt(order.items[i].quantity);
      }
    }
    return amount;
},
  isCategory(order, category, index) {
    return order.items[index].id[0] === category;
  },

  isDiscountTwo(order) {
    if(this.CategoryCounter(order, 'B') > 5) {
      return true;
    } else if (this.CategoryCounter(order, 'B') < 5) {
      return false;
    }
  },
  isDiscountOne(order) {
    if(this.CategoryCounter(order, 'A') >= 2) {
      return true;
    } else if(this.CategoryCounter(order, 'A') < 2) {
      return false;
    }
  },
  Discounter(order) {
    if(this.isDiscountOne(order) || this.isDiscountTwo(order)){
      order.discounts = {}
    }
    if(this.isDiscountOne(order)) {
      order.discounts['a'] = {
          'reduction': this.discountGeneratorOne(order)
        }
      }
    if(this.isDiscountTwo(order)) {
      order.discounts['b'] = {
        'reduction': this.discountGeneratorTwo(order)
      }
    }

    return order;
  },
  discountGeneratorOne(order) {
    let discount = 0;
    for(let i = 0; i < order.items.length; i ++) {
      if(this.isCategory(order, 'A', i))
        if(parseFloat(order.items[i]['unit-price']) < discount || discount === 0){
          parseFloat(order.items[i]['unit-price']).toFixed(2)
          discount = parseFloat(order.items[i]['unit-price']).toFixed(2)
        }
    }
    return ((discount) / 100 * 20).toFixed(2).toString()
  },
  discountGeneratorTwo(order) {
    let discount = 0;
    let counter = 0;
    for(let i = 0; i < order.items.length; i ++) {
        if(this.isCategory(order, 'B', i)) {
          counter = parseFloat(order.items[i].quantity);
          if(counter >= 5) {
            discount = order.items[i]['unit-price']
          }
        }
    }
    return discount
  },
  }



export default DiscountFunctions;
