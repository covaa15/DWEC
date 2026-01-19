import { getProducts, renderProducts} from './modules/index.js';

getProducts().then(products => {
  renderProducts(products);
});