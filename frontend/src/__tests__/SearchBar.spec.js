import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '@/components/SearchBar.vue'

describe('SearchBar', () => {
  it('Check null update emitter when the input is cleared', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: 'iphone',
      },
    })

    const input = wrapper.get('input')
    await input.setValue('')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted[0]).toEqual([null])
  })

  it('Check update emitter with text when the input has value', async () => {
    const wrapper = mount(SearchBar)

    const input = wrapper.get('input')
    await input.setValue('pixel')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted[0]).toEqual(['pixel'])
  })
})
