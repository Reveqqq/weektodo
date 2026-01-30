```js
import { mount } from '@vue/test-utils'
import TaskItem from '@/components/TaskItem.vue'

describe('TaskItem – hover card behavior', () => {
  beforeAll(() => {
    // make sure popper elements are attached to the DOM
    const container = document.createElement('div')
    container.id = 'app'
    document.body.appendChild(container)
  })

  afterAll(() => {
    const app = document.getElementById('app')
    if (app) {
      app.remove()
    }
  })

  it('keeps the HoverCard visible when cursor moves from the row to the card', async () => {
    const wrapper = mount(TaskItem, {
      attachTo: '#app',
    })

    const row = wrapper.find('.task-row')
    await row.trigger('mouseenter')
    await wrapper.vm.$nextTick()

    // HoverCard should appear
    const hoverCard = () => wrapper.findComponent({ name: 'HoverCard' })
    expect(hoverCard().exists()).toBe(true)

    // Simulate moving cursor onto the card
    await hoverCard().trigger('mouseenter')
    await wrapper.vm.$nextTick()

    // Leave the row – card must stay open because cursor is on it
    await row.trigger('mouseleave')
    await wrapper.vm.$nextTick()

    // wait for the hide‑delay defined in the component (≈100 ms)
    await new Promise((r) => setTimeout(r, 200))
    expect(hoverCard().exists()).toBe(true)

    // Finally leave the card itself – it should disappear
    await hoverCard().trigger('mouseleave')
    await new Promise((r) => setTimeout(r, 200))
    expect(hoverCard().exists()).toBe(false)

    wrapper.unmount()
  })
})
```