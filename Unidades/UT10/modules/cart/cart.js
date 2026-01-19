let cart = [];

export const addToCart = (product) => {
  cart.push(product);
  // Notificamos a quien esté escuchando (cartUI)
  document.dispatchEvent(new CustomEvent('cart-updated'));
};

export const getCart = () => cart;

export const getTotal = () => 
  cart.reduce((sum, item) => sum + item.price, 0);