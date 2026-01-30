```js
import { createPopper } from '@popperjs/core'

export function initHoverCard(referenceEl, popperEl, customOptions = {}) {
  const defaultOptions = {
    placement: 'right',
    strategy: 'fixed',
    modifiers: [
      {
        name: 'offset',
        options: { offset: [0, 8] }
      },
      {
        name: 'preventOverflow',
        options: {
          boundary: referenceEl.parentNode,
          padding: 8
        }
      },
      {
        name: 'flip',
        options: { fallbackPlacements: ['left', 'top', 'bottom'] }
      }
    ]
  }

  const popperInstance = createPopper(referenceEl, popperEl, {
    ...defaultOptions,
    ...customOptions,
    modifiers: [
      ...defaultOptions.modifiers,
      ...(customOptions.modifiers || [])
    ]
  })

  return popperInstance
}

export function destroyHoverCard(popperInstance) {
  if (popperInstance) {
    popperInstance.destroy()
  }
}
```