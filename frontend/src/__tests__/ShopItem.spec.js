import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ShopItem from '@/components/ShopItem.vue'

describe('ShopItem', () => {
  it('Check navigation to item details on click', async () => {
    const push = vi.fn()
    const wrapper = mount(ShopItem, {
      props: {
        item: {
          id: 'abc123',
          brand: 'Apple',
          model: 'iPhone',
          price: '999',
          imgUrl: '/image.png',
        },
      },
      global: {
        mocks: {
          $router: { push },
        },
      },
    })

    await wrapper.trigger('click')

    expect(push).toHaveBeenCalledWith({
      name: 'details',
      params: { id: 'abc123' },
    })
  })
})
