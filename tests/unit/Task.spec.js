```javascript
import { mount } from '@vue/test-utils'
import Task from '@/components/Task.vue'
import HoverCard from '@/components/HoverCard.vue'

describe('Task.vue', () => {
  it('should show hover card on mouseenter and hide after delay on mouseleave', async () => {
    const wrapper = mount(Task, {
      propsData: {
        task: { id: 1, title: 'Test Task' }
      }
    })

    await wrapper.trigger('mouseenter')
    expect(wrapper.findComponent(HoverCard).exists()).toBe(true)

    await wrapper.trigger('mouseleave')
    await new Promise(resolve => setTimeout(resolve, 200))
    expect(wrapper.findComponent(HoverCard).exists()).toBe(false)
  })

  it('should not hide hover card when hovering over it', async () => {
    const wrapper = mount(Task, {
      propsData: {
        task: { id: 1, title: 'Test Task' }
      }
    })

    await wrapper.trigger('mouseenter')
    const hoverCard = wrapper.findComponent(HoverCard)
    expect(hoverCard.exists()).toBe(true)

    await hoverCard.trigger('mouseenter')
    await wrapper.trigger('mouseleave')
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(hoverCard.exists()).toBe(true)

    await hoverCard.trigger('mouseleave')
    await new Promise(resolve => setTimeout(resolve, 200))
    expect(hoverCard.exists()).toBe(false)
  })

  it('should position hover card correctly relative to task', async () => {
    const wrapper = mount(Task, {
      propsData: {
        task: { id: 1, title: 'Test Task' }
      }
    })

    await wrapper.trigger('mouseenter')
    const hoverCard = wrapper.findComponent(HoverCard)
    const taskRect = wrapper.element.getBoundingClientRect()
    const cardRect = hoverCard.element.getBoundingClientRect()

    expect(cardRect.top).toBeGreaterThanOrEqual(taskRect.bottom)
    expect(cardRect.left).toBeCloseTo(taskRect.left, 0)
  })
})
```