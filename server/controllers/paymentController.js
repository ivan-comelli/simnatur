const { preferenceMP } = require('../models');

export const createOrder = async (req, res) => {
  try {
    const cart = req.body;
    const itemsCart = cart.map(item => ({
      title: item.title,
      quantity: item.cartQuantity, 
      unit_price: item.price 
    }));
    const result = await preferenceMP.create({
      body: {
        items: itemsCart
      }
    });
    res.json(result)
  } catch(error) {
    console.log(error);
    res.status(500)
  }
}