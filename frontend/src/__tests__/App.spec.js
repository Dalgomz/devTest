import { describe, it, expect } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('Renders <RouterView> component correctly', () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: {
          RouterView: true,
        },
      },
    })

    expect(wrapper.find('router-view-stub').exists()).toBe(true)
  })
})
