import { createPopper } from '@popperjs/core'

export function createPopperInstance(referenceEl, popperEl, config = {}) {
  const {
    placement = 'auto',
    offset = [0, 8],
    modifiers = [],
    ...rest
  } = config

  const defaultModifiers = [
    { name: 'offset', options: { offset } },
    { name: 'flip', options: { fallbackPlacements: ['top', 'bottom'] } },
    { name: 'preventOverflow', options: { padding: 8 } },
    ...modifiers,
  ]

  return createPopper(referenceEl, popperEl, {
    placement,
    modifiers: defaultModifiers,
    ...rest,
  })
}

export function destroyPopper(instance) {
  if (instance) {
    instance.destroy()
  }
}