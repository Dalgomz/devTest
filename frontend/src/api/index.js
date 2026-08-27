const cacheLifespan = 60 * 60 * 1000;

async function cachedApiCall(call, endpoint, options) {
  const cacheKey = `api-${endpoint}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached)

      if (Date.now() - timestamp < cacheLifespan) {
        return data;
      }

      localStorage.removeItem(cacheKey)
    } catch {
      localStorage.removeItem(cacheKey)
    }
  }

  const response = await call(endpoint, options);
    if (response.status < 300) {
      localStorage.setItem(
      cacheKey,
      JSON.stringify({
        data: response.data,
        timestamp: Date.now()
      })
    )
    return response.data;
  }
  return 'error';
}

async function getProducts()  {
  const data = await cachedApiCall(window.axios.get, '/product');
  return data;
}
async function getProduct(id) {
  const data = await cachedApiCall(window.axios.get, `/product/${id}`);
  return data;
}
async function addToCart(options)  {
  const response = await window.axios.post(`/cart`, options);
  if (response.status < 300) {
    return response.data;
  }
  return 'error';}

export default {
  getProducts,
  getProduct,
  addToCart,
};