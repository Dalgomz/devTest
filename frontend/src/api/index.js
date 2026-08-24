async function getProducts()  {
  const response = await window.axios.get(`/product`);
  if (response.status < 300) {
    return response.data;
  }
  return 'error';
}

async function getProduct(id) {
  const response = await window.axios.get(`/product/${id}`);
  if (response.status < 300) {
    return response.data;
  }
  return 'error';
}
async function addToCart()  {

  const response = await window.axios.get(`/cart/${id}`);
  if (response.status < 300) {
    return response.data;
  }
  return 'error';}

export default {
  getProducts,
  getProduct,
  addToCart,
};