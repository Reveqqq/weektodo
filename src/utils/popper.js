```js
import { createPopper } from '@popperjs/core'

export function createPopperInstance(reference, popper, config = {}) {
  const {
    placement = 'auto',
    offset = [0, 8],
    modifiers = [],
    ...rest
  } = config

  const defaultModifiers = [
    { name: 'offset', options: { offset } },
    { name: 'flip', options: { fallbackPlacements: ['top', 'bottom', 'right', 'left'] } },
    { name: 'preventOverflow', options: { padding: 8 } },
    ...modifiers,
  ]

  return createPopper(reference, popper, {
    placement,
    modifiers: defaultModifiers,
    ...rest,
  })
}

export function destroyPopper(instance) {
  if (instance && typeof instance.destroy === 'function') {
    instance.destroy()
  }
}

export default createPopperInstance
```