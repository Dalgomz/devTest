import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCartStore } from '@/stores/cart'

describe('cart store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Startup with cartCount at 0', () => {
    const store = useCartStore()
    expect(store.cartCount).toBe(0)
  })

  it('Check setItems and cleanCart update the cart state', () => {
    const store = useCartStore()
    store.setItems(7)
    expect(store.cartCount).toBe(7)

    store.cleanCart()
    expect(store.cartCount).toBe(0)
  })
})
