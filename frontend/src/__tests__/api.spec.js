import { beforeEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import api from '@/api'

describe('api', () => {
  let mock

  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()

    window.axios = axios.create({
      validateStatus: () => true,
    })
    mock = new MockAdapter(window.axios)
  })

  it('Call getProducts and check correct response and persistent cache', async () => {
    const payload = [{ id: '1', brand: 'Apple', model: 'iPhone' }]
    mock.onGet('/product').reply(200, payload)

    const result = await api.getProducts()

    expect(mock.history.get).toHaveLength(1)
    expect(mock.history.get[0].url).toBe('/product')
    expect(result).toEqual(payload)

    const cached = JSON.parse(localStorage.getItem('api-/product'))
    expect(cached.data).toEqual(payload)
    expect(typeof cached.timestamp).toBe('number')
  })

  it('Check getProducts call using cached data', async () => {
    const payload = [{ id: '2', brand: 'Samsung', model: 'S24' }]
    localStorage.setItem(
      'api-/product',
      JSON.stringify({
        data: payload,
        timestamp: Date.now(),
      }),
    )

    const result = await api.getProducts()

    expect(result).toEqual(payload)
      expect(mock.history.get).toHaveLength(0)
  })

  it('Check getProducts returns api value if cache expires', async () => {
    const oldPayload = [{ id: 'old' }]
    const newPayload = [{ id: 'new' }]
    const expiredCache = JSON.stringify({
      data: oldPayload,
      timestamp: Date.now() - 2 * 60 * 60 * 1000,
    })

    localStorage.setItem(
      'api-/product',
      expiredCache,
    )
    mock.onGet('/product').reply(200, newPayload)

    const result = await api.getProducts()

    expect(mock.history.get).toHaveLength(1)
    expect(mock.history.get[0].url).toBe('/product')
    expect(result).toEqual(newPayload)
  })

  it('Check addToCart returns payload', async () => {
    const payload = { count: 3 }
    mock.onPost('/cart').reply(201, payload)

    const result = await api.addToCart({ id: 'p1', colorCode: 'c1', storageCode: 's1' })

    expect(result).toEqual(payload)
  })

  it('Check addToCart error response', async () => {
    mock.onPost('/cart').reply(500)

    const result = await api.addToCart({ id: 'p1', colorCode: 'c1', storageCode: 's1' })

    expect(result).toBe('error')
  })
})
