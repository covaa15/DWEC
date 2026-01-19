import { createProductCard } from './components/ProductCard.js';
import { renderCart } from '../cart/CartUI.js';

export const renderProducts = (products) => {
  const app = document.getElementById('app');
  app.innerHTML = '';
  products.forEach(p => app.appendChild(createProductCard(p)));
  renderCart(); // actualizamos carrito por si ya había cosas
};