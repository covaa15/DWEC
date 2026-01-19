import { formatPrice } from '../../utils/currency.js';

export const createCartItem = (item) => {
  const li = document.createElement('li');
  li.textContent = `${item.name} - ${formatPrice(item.price)}`;
  return li;
};