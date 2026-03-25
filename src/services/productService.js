import api from './api'

export const getProducts = async () => {
  const response = await api.get('/products')
  return response.data.products
}

export const getProductsSummary = async () => {
  const response = await api.get('/products')
  return {
    total: response.data.total,
    products: response.data.products,
  }
}