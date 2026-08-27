import { beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MainView from '@/views/MainView.vue'
import api from '@/api'

vi.mock('@/api', () => ({
  default: {
    getProducts: vi.fn(),
  },
}))

describe('MainView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Check getProducts fills items with the API response', async () => {
    const payload = [
      { id: '1', brand: 'apple', model: 'iphone' },
      { id: '2', brand: 'google', model: 'pixel' },
    ]
    api.getProducts.mockResolvedValue(payload)

    const wrapper = shallowMount(MainView, {
      global: {
        stubs: {
          Header: true,
          SearchBar: true,
          ShopItem: true,
        },
      },
    })

    await wrapper.vm.getProducts()

    expect(api.getProducts).toHaveBeenCalledTimes(2)
    expect(wrapper.vm.items).toEqual(payload)
  })

  it('Check filteredItems returns all items if searchText is null', async () => {
    const items = [
      { id: '1', brand: 'apple', model: 'iphone' },
      { id: '2', brand: 'google', model: 'pixel' },
    ]

    const result = MainView.computed.filteredItems.call({
      items,
      searchText: null,
    })

    expect(result).toHaveLength(2)
  })

  it('Check filteredItems filters by brand or model when used', async () => {
    const items = [
      { id: '1', brand: 'apple', model: 'iphone' },
      { id: '2', brand: 'google', model: 'pixel' },
    ]

    const result = MainView.computed.filteredItems.call({
      items,
      searchText: 'pix',
    })

    expect(result).toEqual([{ id: '2', brand: 'google', model: 'pixel' }])
  })
})
