import { getCart, getTotal } from './cart.js';
import { formatPrice } from '../utils/currency.js';
import { createCartItem } from '../ui/components/CartItem.js';

const updateCartUI = () => {
  const itemsContainer = document.getElementById('cart-items');
  const totalEl = document.getElementById('total');
  const title = itemsContainer.parentNode.querySelector('h2');

  itemsContainer.innerHTML = '';
  getCart().forEach(item => itemsContainer.appendChild(createCartItem(item)));

  title.textContent = `Carrito (${getCart().length} artículos)`;
  totalEl.textContent = formatPrice(getTotal());
};

document.addEventListener('cart-updated', updateCartUI);

export const renderCart = updateCartUI;