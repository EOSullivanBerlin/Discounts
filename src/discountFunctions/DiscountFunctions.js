var DiscountFunctions = {
  totalByTwo(order) {
    return order.total * 2;
  },
  CategoryCounter(order, category) {
    let amount = 0;
    for(let i = 0; i < order.items.length; i ++) {
      if(this.isCategory(order, category, i)) {
        amount += parseInt(order.items[i].quantity);
      }
    }
    return amount
},
  isCategory(order, category, index) {
    return order.items[index].id[0] === category
  },
}

export default DiscountFunctions;
