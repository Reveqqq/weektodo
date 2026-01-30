import { createPopper } from '@popperjs/core'

export function createPopperInstance(referenceEl, popperEl, config = {}) {
  const {
    placement = 'bottom',
    offset = [0, 8],
    modifiers = [],
    ...rest
  } = config

  return createPopper(referenceEl, popperEl, {
    placement,
    modifiers: [
      { name: 'offset', options: { offset } },
      ...modifiers
    ],
    ...rest
  })
}

export function destroyPopper(instance) {
  if (instance) {
    instance.destroy()
  }
}