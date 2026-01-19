import { formatPrice } from '../../utils/currency.js';
import { addToCart } from '../../cart/cart.js';

export const createProductCard = (product) => {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <h3>${product.name}</h3>
    <p><strong>${formatPrice(product.price)}</strong></p>
    <button data-id="${product.id}">Añadir al carrito</button>
  `;

  div.querySelector('button').addEventListener('click', () => {
    addToCart(product);
  });

  return div;
};