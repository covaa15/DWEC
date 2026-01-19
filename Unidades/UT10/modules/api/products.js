const fakeProducts = [
  { id: 1, name: "Camiseta", price: 19.99 },
  { id: 2, name: "Pantalón", price: 39.99 },
  { id: 3, name: "Zapatillas", price: 79.99 },
  { id: 4, name: "Gorra", price: 15.00 }
];

export const getProducts = () => Promise.resolve(fakeProducts);