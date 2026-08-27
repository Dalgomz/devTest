import { beforeEach, describe, expect, it, vi } from 'vitest'
import ProductDetails from '@/views/ProductDetails.vue'
import api from '@/api'

vi.mock('@/api', () => ({
  default: {
    getProduct: vi.fn(),
    addToCart: vi.fn(),
  },
}))

describe('ProductDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Check getItemDetails assigns item, options and default values', async () => {
    const payload = {
      id: '1',
      brand: 'Apple',
      model: 'iPhone',
      price: '999',
      weight: '200',
      options: {
        storages: [{ code: '64', name: '64 GB' }],
        colors: [{ code: 'black', name: 'Black' }],
      },
    }
    api.getProduct.mockResolvedValue(payload)

    const ctx = {
      item: {},
      options: { storages: [], colors: [] },
      storage: null,
      color: null,
      descriptionProperties: [],
      $route: { params: { id: '1' } },
    }

    await ProductDetails.methods.getItemDetails.call(ctx)

    expect(api.getProduct).toHaveBeenCalledWith('1')
    expect(ctx.item).toEqual(payload)
    expect(ctx.options).toEqual(payload.options)
    expect(ctx.storage).toEqual(payload.options.storages[0])
    expect(ctx.color).toEqual(payload.options.colors[0])
    expect(ctx.descriptionProperties.length).toBeGreaterThan(0)
  })

  it('Check addToCart calls the API and updates the store counter store', async () => {
    api.addToCart.mockResolvedValue({ count: 5 })
    const setItems = vi.fn()

    const ctx = {
      item: { id: '1' },
      color: { code: 'black' },
      storage: { code: '64' },
      cartStore: { setItems },
    }

    await ProductDetails.methods.addToCart.call(ctx)

    expect(api.addToCart).toHaveBeenCalledWith({
      id: '1',
      colorCode: 'black',
      storageCode: '64',
    })
    expect(setItems).toHaveBeenCalledWith(5)
  })
})
