```javascript
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Component from '../src/components/Component.vue'

describe('Component', () => {
  it('renders correctly', () => {
    const wrapper = mount(Component)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('emits event on click', async () => {
    const wrapper = mount(Component)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
```